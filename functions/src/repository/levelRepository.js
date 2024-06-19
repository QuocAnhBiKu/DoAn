const { db } = require('../configs/firebaseConfig');
const { collection, getDocs, doc, getDoc, where, query } = require('firebase/firestore');
const Level = require('../model/levelModel');
const lessonRepository = require('./lessonRepository');
const toolRepository = require('./toolRepository'); // Assuming you have a toolRepository

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
      
        for (const doc of levelsSnapshot.docs) {
          const level = new Level(
            doc.id,
            courseId,
            doc.data().levelName,
            doc.data().levelDescription,
            await this.getLevelTools(doc.data().levelTools || []),
            await this.getLevelLessonNames(courseId, doc.id) // Get only lesson names
          );
          levelsData.push(level);
        }
      
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
        await this.getLevelTools(levelData.levelTools || []),
        await this.getLevelLessonNames(courseId, levelId) // Get only lesson names
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

  async getLevelTools(toolIds) {
    const tools = [];
    for (const toolId of toolIds) {
      const tool = await toolRepository.getToolById(toolId);
      if (tool) {
        tools.push(tool);
      } else {
        console.log(`Tool with ID ${toolId} not found.`);
      }
    }
    return tools;
  }

  async getLevelLessonNames(courseId, levelId) {
    const lessonsSnapshot = await getDocs(collection(db, 'Courses', courseId, 'Levels', levelId, 'Lessons'));
    const lessonNames = [];
    lessonsSnapshot.forEach(doc => {
      lessonNames.push(doc.data().lessonName);
    });
    return lessonNames;
  }
}

module.exports = new LevelRepository();