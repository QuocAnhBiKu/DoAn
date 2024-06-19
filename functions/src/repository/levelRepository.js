const { db } = require('../configs/firebaseConfig');
const { collection, getDocs, doc, getDoc, where, query } = require('firebase/firestore');
const Level = require('../model/levelModel');
const lessonRepository = require('./lessonRepository');

class LevelRepository {
    async getAllLevelsForCourseWithDetails(courseId) {
        const levelsData = [];
        const levelsSnapshot = await getDocs(collection(db, 'Courses', courseId, 'Levels'));
    
        for (const doc of levelsSnapshot.docs) {
          const level = new Level(
            doc.id,
            courseId,
            doc.data().levelName,
            doc.data().levelDescription,
            doc.data().levelTools || []
          );
          level.lessons = await lessonRepository.getAllLessonsForLevelWithDetails(courseId, doc.id);
          levelsData.push(level);
        }
    
        return levelsData;
      }
  async getAllLevelsForCourse(courseId) {
    const levelsData = [];
    const levelsSnapshot = await getDocs(collection(db, 'Courses', courseId, 'Levels'));

    levelsSnapshot.forEach(doc => {
      const level = new Level(
        doc.id,
        courseId,
        doc.data().levelName,
        doc.data().levelDescription,
        doc.data().levelTools,
        doc.data().levelLessons || {}
      );
      levelsData.push(level);
    });

    return levelsData;
  }

  async findLevelById(courseId, levelId) {
    const docRef = doc(db, 'Courses', courseId, 'Levels', levelId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const levelData = docSnap.data();
      return new Level(
        docSnap.id,
        courseId,
        levelData.levelName,
        levelData.levelDescription,
        levelData.levelTools,
        levelData.levelLessons || {}
      );
    } else {
      return null;
    }
  }
  async findLevelByName(courseId, levelName) {
    const levelsRef = collection(db, 'Courses', courseId, 'Levels');
    const q = query(levelsRef, where('levelName', '==', levelName));
    const querySnapshot = await getDocs(q);
  
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      const levelData = doc.data();
      return new Level(
        doc.id,
        courseId,
        levelData.levelName,
        levelData.levelDescription,
        levelData.levelTools,
        levelData.levelLessons || {}
      );
    } else {
      return null;
    }
  }
}

module.exports = new LevelRepository();