const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lessonController');
const { verifyToken, isAdmin, isUser } = require('../middleware/authmiddleware');

// Định tuyến để lấy tất cả các bài học
router.get('/',verifyToken,isAdmin, lessonController.getAllLessons);

// Định tuyến để tìm bài học theo ID
router.get('/findbyid',verifyToken,isAdmin, lessonController.findLessonById);

// Định tuyến để tìm bài học theo tên, với các tham số động courseId, levelId, lessonName
router.get('/:courseId/:levelId/name/:lessonName',verifyToken,isAdmin, lessonController.findLessonByName);

module.exports = router;
