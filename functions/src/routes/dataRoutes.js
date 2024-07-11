const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');

// Định tuyến để lấy tất cả dữ liệu
router.get('/', dataController.getAll);

// Định tuyến để lấy dữ liệu theo ID của course, level và lesson
router.get('/courses/:courseId/levels/:levelId/lessons/:lessonId', dataController.getAllById);

module.exports = router;
