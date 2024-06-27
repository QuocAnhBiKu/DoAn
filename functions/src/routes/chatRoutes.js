const express = require('express');
const router = express.Router();
const { quizController, glossaryController, instrunctionController } = require('../controllers/chatController');
const { verifyToken, isAdmin, isUser } = require('../middleware/authmiddleware');

// Summary
router.post('/generateSummary', verifyToken, glossaryController);

// Quiz
router.post('/generateQuiz', verifyToken, isAdmin, quizController);

// Project Instruction
router.post('/generateProject', verifyToken, instrunctionController);

module.exports = router;
