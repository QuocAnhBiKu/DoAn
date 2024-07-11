// controllers/courseController.js
const courseService = require('../service/courseService');

// Hàm getAllCourses: Lấy tất cả các khóa học từ dịch vụ courseService và trả về dưới dạng JSON.
async function getAllCourses(req, res) {
  try {
    const courses = await courseService.getAllCourses();
    res.json(courses);
  } catch (error) {
    res.status(500).send(error.message); // Báo lỗi nếu có lỗi xảy ra trong quá trình lấy dữ liệu khóa học
  }
}

// Hàm findByCourseId: Tìm kiếm khóa học bằng courseId từ dịch vụ courseService và trả về thông tin khóa học tương ứng.
async function findByCourseId(req, res) {
  try {
    const courseId = req.query.id; // Lấy thông tin courseId từ query parameters
    const course = await courseService.findByCourseId(courseId);
    if (course) {
      res.json(course); // Trả về thông tin khóa học nếu tìm thấy
    } else {
      res.status(404).send('Course not found'); // Báo lỗi nếu không tìm thấy khóa học
    }
  } catch (error) {
    res.status(500).send(error.message); // Báo lỗi nếu có lỗi xảy ra trong quá trình tìm kiếm khóa học
  }
}

// Hàm findByCourseName: Tìm kiếm các khóa học bằng courseName từ dịch vụ courseService và trả về dưới dạng JSON.
async function findByCourseName(req, res) {
  try {
    const courseName = req.query.courseName; // Lấy thông tin courseName từ query parameters
    const courses = await courseService.findByCourseName(courseName);
    res.json(courses); // Trả về danh sách các khóa học có tên tương ứng
  } catch (error) {
    res.status(500).send(error.message); // Báo lỗi nếu có lỗi xảy ra trong quá trình tìm kiếm các khóa học
  }
}

module.exports = {
  getAllCourses,
  findByCourseId,
  findByCourseName,
};
