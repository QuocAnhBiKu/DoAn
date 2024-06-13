// routes/levelsRoutes.js
const express = require('express');
const router = express.Router();
const { getAllLevelsForCourseController } = require('../controllers/levelController');

// Định nghĩa route để lấy danh sách các cấp độ của một khóa học cụ thể
router.get('/:courseId', getAllLevelsForCourseController);

module.exports = router;
