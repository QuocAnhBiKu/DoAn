const { db } = require('../configs/firebaseConfig');
const { collection, getDocs, doc, getDoc } = require('firebase/firestore');

async function getAllData() {
  const coursesData = [];

  const coursesSnapshot = await getDocs(collection(db, 'Courses'));

  for (const courseDoc of coursesSnapshot.docs) {
    const courseData = {
      courseId: courseDoc.id,
      courseName: courseDoc.data().courseName,
      courseDescription: courseDoc.data().courseDescription,
      courseTools: courseDoc.data().courseTools || [],
      courseLevels: {}
    };

    const levelsSnapshot = await getDocs(collection(db, 'Courses', courseDoc.id, 'Levels'));

    for (const levelDoc of levelsSnapshot.docs) {
      const levelData = {
        levelName: levelDoc.data().levelName,
        levelDescription: levelDoc.data().levelDescription,
        levelTools: levelDoc.data().levelTools || [],
        levelLessons: {}
      };

      const lessonsSnapshot = await getDocs(collection(db, 'Courses', courseDoc.id, 'Levels', levelDoc.id, 'Lessons'));

      for (const lessonDoc of lessonsSnapshot.docs) {
        const lessonData = {
          lessonName: lessonDoc.data().lessonName,
          lessonNumber: lessonDoc.data().lessonNumber,
          lessonImage: lessonDoc.data().lessonImage,
          lessonTopic: lessonDoc.data().lessonTopic,
          lessonGoal: lessonDoc.data().lessonGoal,
          lessonTools: lessonDoc.data().lessonTools || [],
          lessonConcepts: {
            conceptComputerScience: lessonDoc.data().conceptComputerScience || [],
            conceptScience: lessonDoc.data().conceptScience || [],
            conceptSkill: lessonDoc.data().conceptSkill || []
          },
          lessonMaterials: {
            lessonPlanId: lessonDoc.data().lessonPlanId,
            slideId: lessonDoc.data().slideId,
            summaryId: lessonDoc.data().summaryId,
            quizId: lessonDoc.data().quizId,
            videoId: lessonDoc.data().videoId
          },
          lessonProject: null
        };

        if (lessonDoc.data().projectId) {
          const projectDoc = await getDoc(doc(db, 'Projects', lessonDoc.data().projectId));
          if (projectDoc.exists()) {
            lessonData.lessonProject = {
              projectId: projectDoc.id,
              projectName: projectDoc.data().projectName,
              projectDescription: projectDoc.data().projectDescription,
              projectRelatedConcepts: projectDoc.data().projectRelatedConcepts || [],
              projectTools: projectDoc.data().projectTools || [],
              projectInstruction: projectDoc.data().projectInstruction
            };
          }
        }

        levelData.levelLessons[lessonDoc.id] = lessonData;
      }

      courseData.courseLevels[levelDoc.id] = levelData;
    }

    coursesData.push(courseData);
  }

  return { courses: coursesData };
}

module.exports = {
  getAllData,
};
