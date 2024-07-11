// dataService.js
const CourseRepository = require('../repository/courseRepository');
const courseRepository = new CourseRepository();

// Hàm getAllData: Lấy tất cả dữ liệu của các khóa học với thông tin chi tiết
async function getAllData() {
  const courses = await courseRepository.getAllCoursesWithDetails();
  return { courses };
}

// Hàm getAllById: Lấy dữ liệu của khóa học dựa trên các id của khóa học, cấp độ và bài học
async function getAllById(courseId, levelId, lessonId) {
  const data = await courseRepository.findByIdData(courseId, levelId, lessonId);
  if (!data) {
    throw new Error('Không tìm thấy khóa học, cấp độ hoặc bài học');
  }
  return data;
}

module.exports = {
  getAllData,
  getAllById,
};
