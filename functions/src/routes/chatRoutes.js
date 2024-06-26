const express = require('express');
const router = express.Router();
const glossaryController = require('../controllers/glossaryController');
const {quizController} = require('../controllers/chatController');

// Glossary
router.get('/glossary', glossaryController.getGlossaryForLesson);
router.post("/generateQuiz", quizController);

module.exports = router;