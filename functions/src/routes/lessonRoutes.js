// routes/lessonsRoutes.js
const express = require('express');
const router = express.Router();
const { getAllLessonsForLevelController } = require('../controllers/lessonController');

// Định nghĩa route để lấy danh sách các bài học của một cấp độ trong một khóa học
router.get('/:courseId/:levelId', getAllLessonsForLevelController);

module.exports = router;
