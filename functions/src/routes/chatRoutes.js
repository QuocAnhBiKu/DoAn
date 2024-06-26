const express = require('express');
const router = express.Router();
const {quizController, glossaryController, instrunctionController} = require('../controllers/chatController');

// Summary
router.post('/generateSummary', glossaryController);
// Quiz
router.post('/generateQuiz', quizController);
// Project Instruction
router.post('/generateProject', instrunctionController)

module.exports = router;