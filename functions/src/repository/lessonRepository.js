const { db } = require("../configs/firebaseConfig");
const { collection, getDocs, where, query, doc, getDoc } = require("firebase/firestore");
const Lesson = require("../model/lessonModel");
const materialRepository = require('./materialRepository');
const projectRepository = require('./projectRepository');

class LessonRepository {
  async getAllLessons(courseId, levelId) {
    const lessonsData = [];

    const lessonsSnapshot = await getDocs(
      collection(db, "Courses", courseId, "Levels", levelId, "Lessons")
    );

    lessonsSnapshot.forEach((doc) => {
      const lesson = new Lesson(doc, courseId, levelId);
      lessonsData.push(lesson);
    });

    return lessonsData;
  }

  async getAllLessonsForLevelWithDetails(courseId, levelId) {
    const lessonsData = [];
    const lessonsSnapshot = await getDocs(collection(db, 'Courses', courseId, 'Levels', levelId, 'Lessons'));

    for (const doc of lessonsSnapshot.docs) {
      const lesson = new Lesson(doc, courseId, levelId);
      lesson.materials = await this.getLessonMaterials(doc);
      lesson.project = await this.getLessonProject(doc);
      lessonsData.push(lesson);
    }

    return lessonsData;
  }

  async getLessonMaterials(lessonDoc) {
    const materials = {};
    const materialTypes = ['lessonPlan', 'slide', 'summary', 'quiz', 'video'];

    for (const type of materialTypes) {
        const materialId = lessonDoc.data()[`${type}Id`];
        if (materialId) {
            const material = await materialRepository.findByMaterialId(materialId);
            if (material) {
                materials[type] = material;
            } else {
                console.log(`Material of type ${type} with ID ${materialId} not found for lesson ${lessonDoc.id}`);
            }
        }
    }

    return materials;
}
  async getLessonProject(lessonDoc) {
    const projectId = lessonDoc.data().projectId;
    if (projectId) {
      return await projectRepository.getProjectById(projectId);
    }
    return null;
  }

  async findLessonById(courseId, levelId, lessonId) {
    const lessonsRef = collection(
      db,
      "Courses",
      courseId,
      "Levels",
      levelId,
      "Lessons"
    );
    const lessonQuery = query(lessonsRef, where("lessonId", "==", lessonId));
    const lessonSnapshot = await getDocs(lessonQuery);

    if (lessonSnapshot.empty) {
      return null;
    }

    const doc = lessonSnapshot.docs[0];
    const lesson = new Lesson(doc, courseId, levelId);
    lesson.materials = await this.getLessonMaterials(doc);
    lesson.project = await this.getLessonProject(doc);
    return lesson;
  }

  async findLessonByName(courseId, levelId, lessonName) {
    const lessonsRef = collection(
      db,
      "Courses",
      courseId,
      "Levels",
      levelId,
      "Lessons"
    );
    const lessonQuery = query(lessonsRef, where("lessonName", "==", lessonName));
    const lessonSnapshot = await getDocs(lessonQuery);

    if (lessonSnapshot.empty) {
      return null;
    }

    const doc = lessonSnapshot.docs[0];
    const lesson = new Lesson(doc, courseId, levelId);
    lesson.materials = await this.getLessonMaterials(doc);
    lesson.project = await this.getLessonProject(doc);
    return lesson;
  }
}

module.exports = new LessonRepository();