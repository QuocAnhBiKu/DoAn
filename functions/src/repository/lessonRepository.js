const { db } = require("../configs/firebaseConfig");
const { collection, getDocs, where, query, doc, getDoc } = require("firebase/firestore");
const Lesson = require("../model/lessonModel");
const levelRepository = require('./levelRepository');
const materialRepository = require('./materialRepository');
const projectRepository = require('./projectRepository');
const toolRepository = require('./toolRepository');

class LessonRepository {
  // Hàm lấy tất cả các bài học của một cấp độ trong một khóa học
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

  // Hàm data lấy tất cả các bài học của một cấp độ cùng với thông tin chi tiết
  async getAllLessonsForLevelWithDetails(courseId, levelId) {
    const lessonsData = [];
    const lessonsSnapshot = await getDocs(collection(db, 'Courses', courseId, 'Levels', levelId, 'Lessons'));

    for (const doc of lessonsSnapshot.docs) {
      const lesson = new Lesson(doc, courseId, levelId);
      lesson.materials = await this.getLessonMaterials(doc);
      lesson.project = await this.getLessonProject(doc);
      lesson.tools = await this.getLessonTools(doc);
      lessonsData.push(lesson);
    }

    return lessonsData;
  }

  // Hàm lấy thông tin tài liệu của một bài học
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

  // Hàm lấy thông tin dự án của một bài học
  async getLessonProject(lessonDoc) {
    const projectId = lessonDoc.data().projectId;
    
    if (projectId) {
      const project = await projectRepository.getProjectById(projectId);
      if (project) {
        return project;
      }
    }
    return {
      projectId: '',
      projectName: '',
      projectDescription: '',
      projectRelatedConcepts: '',
      projectTools: '',
      projectInstruction: ''
    };
  }

  // Hàm lấy thông tin công cụ của một bài học
  async getLessonTools(lessonDoc) {
    const toolIds = lessonDoc.data().lessonTools || [];
    const tools = [];
  
    for (const toolId of toolIds) {
      try {
        const tool = await toolRepository.getToolById(toolId);
        if (tool) {
          tools.push(tool);
        } else {
          console.log(`Tool with ID ${toolId} not found.`);
        }
      } catch (error) {
        console.error(`Error fetching tool with ID ${toolId}:`, error);
      }
    }
  
    return tools;
  }

  // Hàm lấy thông tin cấp độ theo ID
  async getLevelById(courseId, levelId) {
    const levelRef = doc(db, "Courses", courseId, "Levels", levelId);
    const levelDoc = await getDoc(levelRef);

    if (levelDoc.exists()) {
      return levelDoc.data();
    } else {
      console.log(`Level with ID ${levelId} not found.`);
      return null;
    }
  }

  // Hàm tìm bài học theo ID
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
    lesson.tools = await this.getLessonTools(doc);

    // Lấy dữ liệu cấp độ và chỉ bao gồm levelDescription
    const levelData = await this.getLevelById(courseId, levelId);
    if (levelData) {
      lesson.levelDescription = levelData.levelDescription;
    }

    return lesson;
  }

  // Hàm tìm bài học theo tên
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
    lesson.tools = await this.getLessonTools(doc);

    // Lấy dữ liệu cấp độ và chỉ bao gồm levelDescription
    const levelData = await this.getLevelById(courseId, levelId);
    if (levelData) {
      lesson.levelDescription = levelData.levelDescription;
    }

    return lesson;
  }
}

module.exports = new LessonRepository();
