const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// Định tuyến để lấy tất cả các khóa học
router.get('/', courseController.getAllCourses);

// Thay đổi route để tìm khóa học bằng ID
router.get('/find', courseController.findByCourseId);

// Định tuyến để tìm khóa học bằng tên khóa học
router.get('/name/:courseName', courseController.findByCourseName);

module.exports = router;
