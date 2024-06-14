// services/courseService.js
const CourseRepository = require('../repository/courseRepository');

const courseRepository = new CourseRepository();

async function getAllCourses() {
  return await courseRepository.getAllCourses();
}

async function findByCourseId(courseId) {
  return await courseRepository.findByCourseId(courseId);
}

async function findByCourseName(courseName) {
  return await courseRepository.findByCourseName(courseName);
}

module.exports = {
  getAllCourses,
  findByCourseId,
  findByCourseName,
};
