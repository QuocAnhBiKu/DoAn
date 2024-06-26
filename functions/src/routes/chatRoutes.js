const express = require('express');
const router = express.Router();
const {quizController, glossaryController} = require('../controllers/chatController');

// Summary
router.post('/generateSummary', glossaryController);
// Quiz
router.post("/generateQuiz", quizController);

module.exports = router;