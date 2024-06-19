const { db } = require('../configs/firebaseConfig');
const { collection, getDocs, doc, getDoc, where, query } = require('firebase/firestore');
const Level = require('../model/levelModel');
const lessonRepository = require('./lessonRepository');
const toolRepository = require('./toolRepository');

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
        levelData.levelTools || [],  // Ensure levelTools is an array
        levelData.levelLessons || [] // Ensure levelLessons is an array
      );
      // Fetch tool details for each toolId in levelTools
      const toolsData = [];
      if (level.levelTools.length > 0) {
        for (const toolId of level.levelTools) {
          const tool = await toolRepository.getToolById(toolId);
          if (tool) {
            toolsData.push(tool);
          }
        }
      }
      level.levelTools = toolsData;

      level.lessons = await lessonRepository.getAllLessonsForLevelWithDetails(courseId, doc.id);
      levelsData.push(level);
    }

    return levelsData;
  }
  async getAllLevelsForCourse(courseId) {
    const levelsData = [];
    const levelsSnapshot = await getDocs(collection(db, 'Courses', courseId, 'Levels'));

    for (const doc of levelsSnapshot.docs) {
      const levelData = doc.data();
      const level = new Level(
        doc.id,
        courseId,
        levelData.levelName,
        levelData.levelDescription,
        levelData.levelTools || [],  // Ensure levelTools is an array
        levelData.levelLessons || [] // Ensure levelLessons is an array
      );

      // Fetch tool details for each toolId in levelTools
      const toolsData = [];
      if (level.levelTools.length > 0) {
        for (const toolId of level.levelTools) {
          const tool = await toolRepository.getToolById(toolId);
          if (tool) {
            toolsData.push(tool);
          }
        }
      }
      level.levelTools = toolsData;

      // Fetch lessons details for the level
      const lessons = [];
      for (const lessonId of level.levelLessons) {
        const lesson = await lessonRepository.findLessonById(courseId, levelId, lessonId);
        if (lesson) {
          lessons.push(lesson.lessonName);
        }
      }
      level.levelLessons = lessons;
      levelsData.push(level);
    }

    return levelsData;
  }

  async findLevelById(courseId, levelId) {
    const docRef = doc(db, 'Courses', courseId, 'Levels', levelId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const levelData = docSnap.data();
      const level = new Level(
        docSnap.id,
        courseId,
        levelData.levelName,
        levelData.levelDescription,
        levelData.levelTools || [],  // Ensure levelTools is an array
        levelData.levelLessons || [] // Ensure levelLessons is an array
      );

      // Fetch tool details for each toolId in levelTools
      const toolsData = [];
      if (level.levelTools.length > 0) {
        const toolPromises = level.levelTools.map(async (toolId) => {
          const tool = await toolRepository.getToolById(toolId);
          if (tool) {
            toolsData.push(tool);
          }
        });
        await Promise.all(toolPromises);
      }
      level.levelTools = toolsData;

      // Fetch lessons details for the level
      const lessons = [];
      for (const lessonId of level.levelLessons) {
        const lesson = await lessonRepository.findLessonById(courseId, levelId, lessonId);
        if (lesson) {
          lessons.push(lesson.lessonName);
        }
      }
      level.levelLessons = lessons;

      return level;
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
