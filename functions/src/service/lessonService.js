// models/lessonsModel.js
const { db } = require('../configs/firebaseConfig');
const { collection, getDocs } = require('firebase/firestore');

async function getAllLessonsForLevel(courseId, levelId) {
  const lessonsData = [];

  const lessonsSnapshot = await getDocs(collection(db, 'Courses', courseId, 'Levels', levelId, 'Lessons'));

  lessonsSnapshot.forEach(doc => {
    const lesson = {
      lessonId: doc.id,
      lessonName: doc.data().lessonName,
      lessonNumber: doc.data().lessonNumber,
      lessonImage: doc.data().lessonImage,
      lessonTopic: doc.data().lessonTopic,
      lessonGoal: doc.data().lessonGoal,
      lessonTools: doc.data().lessonTools || [],
      lessonConcepts: {
        conceptComputerScience: doc.data().conceptComputerScience || [],
        conceptScience: doc.data().conceptScience || [],
        conceptTech: doc.data().conceptTech || [],
        conceptEngineering: doc.data().conceptEngineering || [],
        conceptArt: doc.data().conceptArt || [],
        conceptMath: doc.data().conceptMath || []
      },
      lessonMaterials: {
        lessonPlanId: doc.data().lessonPlanId,
        slideId: doc.data().slideId,
        summaryId: doc.data().summaryId,
        quizId: doc.data().quizId,
        videoId: doc.data().videoId
      },
      lessonProject: {
        projectId: doc.data().projectId || null
      }
    };
    lessonsData.push(lesson);
  });

  return lessonsData;
}

module.exports = {
  getAllLessonsForLevel,
};
