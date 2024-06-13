const { db } = require('../configs/firebaseConfig');
const { collection, getDocs, doc, getDoc } = require('firebase/firestore');

async function getAllCoursesData() {
  const coursesData = [];
  const coursesSnapshot = await getDocs(collection(db, 'Courses'));

  for (const courseDoc of coursesSnapshot.docs) {
    const courseData = courseDoc.data();
    courseData.courseId = courseDoc.id;
    courseData.courseLevels = {};

    const levelsSnapshot = await getDocs(collection(db, 'Courses', courseDoc.id, 'Levels'));
    for (const levelDoc of levelsSnapshot.docs) {
      const levelData = levelDoc.data();
      levelData.levelId = levelDoc.id;
      levelData.levelLessons = {};

      const lessonsSnapshot = await getDocs(collection(db, 'Courses', courseDoc.id, 'Levels', levelDoc.id, 'Lessons'));
      for (const lessonDoc of lessonsSnapshot.docs) {
        const lessonData = lessonDoc.data();
        lessonData.lessonId = lessonDoc.id;

        if (lessonData.projectId) {
          const projectDoc = await getDoc(doc(db, 'Projects', lessonData.projectId));
          if (projectDoc.exists()) {
            lessonData.lessonProject = projectDoc.data();
            lessonData.lessonProject.projectId = projectDoc.id;
          }
        }

        lessonData.lessonConcepts = {
          conceptComputerScience: lessonData.conceptComputerScience || [],
          conceptScience: lessonData.conceptScience || [],
          conceptSkill: lessonData.conceptSkill || []
        };

        lessonData.lessonMaterials = {
          linkLessonPlan: lessonData.linkLessonPlan,
          linkSlide: lessonData.linkSlide,
          linkSummary: lessonData.linkSummary,
          linkQuiz: lessonData.linkQuiz,
          linkVideo: lessonData.linkVideo
        };

        delete lessonData.conceptComputerScience;
        delete lessonData.conceptScience;
        delete lessonData.conceptSkill;
        delete lessonData.linkLessonPlan;
        delete lessonData.linkSlide;
        delete lessonData.linkSummary;
        delete lessonData.linkQuiz;
        delete lessonData.linkVideo;
        delete lessonData.projectId;

        levelData.levelLessons[lessonDoc.id] = lessonData;
      }

      courseData.courseLevels[levelDoc.id] = levelData;
    }

    coursesData.push(courseData);
  }

  return coursesData;
}

module.exports = {
  getAllCoursesData,
};