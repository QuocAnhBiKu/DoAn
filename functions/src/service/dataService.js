// dataService.js
const CourseRepository = require('../repository/courseRepository');
const courseRepository = new CourseRepository();

async function getAllData() {
  const courses = await courseRepository.getAllCoursesWithDetails();
  return { courses };
}


async function getAllById(courseId, levelId, lessonId) {
  const data = await courseRepository.findByIdData(courseId, levelId, lessonId);
  if (!data) {
    throw new Error('Course, level, or lesson not found');
  }
  return data;
}

module.exports = {
  getAllData,
  getAllById,
};