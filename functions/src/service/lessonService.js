const lessonRepository = require("../repository/lessonRepository");

async function getAllLessons(courseId, levelId) {
  try {
    const lessons = await lessonRepository.getAllLessons(courseId, levelId);
    return lessons;
  } catch (error) {
    throw new Error("Failed to fetch lessons from repository");
  }
}

async function findLessonById(courseId, levelId, lessonId) {
  try {
    const lesson = await lessonRepository.findLessonById(courseId, levelId, lessonId);
    return lesson;
  } catch (error) {
    throw new Error("Failed to find lesson by lessonId from repository");
  }
}

async function findLessonByName(courseId, levelId, lessonName) {
  try {
    const lesson = await lessonRepository.findLessonByName(courseId, levelId, lessonName);
    return lesson;
  } catch (error) {
    throw new Error("Failed to find lesson by lessonName from repository");
  }
}

module.exports = {
  getAllLessons,
  findLessonById,
  findLessonByName,
};
