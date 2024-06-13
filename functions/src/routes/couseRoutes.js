
// routes/coursesRoutes.js

const express = require('express');
const router = express.Router();
const { getAllCourses } = require('../controllers/courseController');

// Định nghĩa route GET để lấy danh sách tất cả các khóa học
router.get('/', getAllCourses); // Ensure getAllCoursesController is defined and imported correctly

module.exports = router;
