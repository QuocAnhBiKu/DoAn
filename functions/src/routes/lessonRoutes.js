const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lessonController');

router.get('/:courseId/:levelId', lessonController.getAllLessons);
router.get('/:courseId/:levelId/id/:lessonId', lessonController.findLessonById);
router.get('/:courseId/:levelId/name/:lessonName', lessonController.findLessonByName);

module.exports = router;
