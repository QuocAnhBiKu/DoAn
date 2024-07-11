const lessonRepository = require("../repository/lessonRepository");

// Hàm getAllLessons: Lấy danh sách tất cả các bài học của một khóa học và một cấp độ cụ thể
async function getAllLessons(courseId, levelId) {
  try {
    const lessons = await lessonRepository.getAllLessons(courseId, levelId);
    return lessons;
  } catch (error) {
    throw new Error("Failed to fetch lessons from repository");
  }
}

// Hàm findLessonById: Tìm kiếm và trả về thông tin của một bài học dựa trên id bài học
async function findLessonById(courseId, levelId, lessonId) {
  try {
    const lesson = await lessonRepository.findLessonById(courseId, levelId, lessonId);
    return lesson;
  } catch (error) {
    throw new Error("Failed to find lesson by lessonId from repository");
  }
}

// Hàm findLessonByName: Tìm kiếm và trả về thông tin của một bài học dựa trên tên bài học
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
