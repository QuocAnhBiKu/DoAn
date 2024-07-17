// services/courseService.js
const courseRepository= require('../repository/courseRepository');


// Hàm getAllCourses: Lấy tất cả các khóa học từ kho dữ liệu
async function getAllCourses() {
  return await courseRepository.getAllCourses();
}

// Hàm findByCourseId: Tìm khóa học dựa trên ID của khóa học
async function findByCourseId(courseId) {
  return await courseRepository.findByCourseId(courseId);
}

// Hàm findByCourseName: Tìm khóa học dựa trên tên của khóa học
async function findByCourseName(courseName) {
  return await courseRepository.findByCourseName(courseName);
}

module.exports = {
  getAllCourses,
  findByCourseId,
  findByCourseName,
};
