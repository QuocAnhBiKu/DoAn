const lessonService = require("../service/lessonService");
const glossaryService = require("../service/glossaryService");
const quizService = require('../service/chatService');

let lastFetchedLesson = null;

async function getAllLessons(req, res) {
  const { courseId, levelId } = req.query;
  try {
    const lessons = await lessonService.getAllLessons(courseId, levelId);
    res.json(lessons);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function findLessonById(req, res) {
  const { courseId, levelId, lessonId } = req.query;
  
  try {
    const lesson = await lessonService.findLessonById(courseId, levelId, lessonId);
    if (!lesson) {
      res.status(404).json({ message: "Lesson not found" });
    } else {
      lastFetchedLesson = lesson;
      glossaryService.setLastFetchedLesson(lesson); // Update lastFetchedLesson
      res.json(lesson);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function findLessonByName(req, res) {
  const { courseId, levelId, lessonName } = req.params;
  try {
    const lesson = await lessonService.findLessonByName(courseId, levelId, lessonName);
    if (!lesson) {
      res.status(404).json({ message: "Lesson not found" });
    } else {
      res.json(lesson);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  getAllLessons,
  findLessonById,
  findLessonByName,
};
