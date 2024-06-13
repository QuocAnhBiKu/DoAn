const { db } = require('../configs/firebaseConfig');
const { collection, getDocs } = require('firebase/firestore');

async function getAllLevelsForCourse(courseId) {
  const levelsData = [];

  const levelsSnapshot = await getDocs(collection(db, 'Courses', courseId, 'Levels'));

  levelsSnapshot.forEach(doc => {
    const level = {
      levelId: doc.id,
      levelName: doc.data().levelName,
      levelDescription: doc.data().levelDescription,
      levelTools: doc.data().levelTools || []
    };
    levelsData.push(level);
  });

  return levelsData;
}

module.exports = {
  getAllLevelsForCourse,
};
