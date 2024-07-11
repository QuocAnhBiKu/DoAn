const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lessonController');

// Định tuyến để lấy tất cả các bài học
router.get('/', lessonController.getAllLessons);

// Định tuyến để tìm bài học theo ID
router.get('/findbyid', lessonController.findLessonById);

// Định tuyến để tìm bài học theo tên, với các tham số động courseId, levelId, lessonName
router.get('/:courseId/:levelId/name/:lessonName', lessonController.findLessonByName);

module.exports = router;
