const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lessonController');

router.get('/', lessonController.getAllLessons);
router.get('/findbyid', lessonController.findLessonById);
router.get('/:courseId/:levelId/name/:lessonName', lessonController.findLessonByName);
router.get('/glossary', lessonController.getGlossaryForLesson); // Thêm tuyến đường mới
router.post('/getQuizData', lessonController.getQuizData); // Thêm tuyến đường mới

module.exports = router;
