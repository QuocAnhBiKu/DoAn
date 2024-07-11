const express = require('express');
const router = express.Router();
const { quizController, glossaryController, instrunctionController } = require('../controllers/chatController');
const { verifyToken, isAdmin, isUser } = require('../middleware/authmiddleware');

// Định tuyến cho chức năng tạo tóm tắt và xác thực token
router.post('/generateSummary', verifyToken, glossaryController);

// Định tuyến cho chức năng tạo câu đố, chỉ dành cho quản trị viên và xác thực token
router.post('/generateQuiz', verifyToken, isAdmin, quizController);

// Định tuyến cho chức năng tạo hướng dẫn dự án và xác thực token
router.post('/generateProject', verifyToken, instrunctionController);

module.exports = router;
