const lessonService = require("../service/lessonService");

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

let lastFetchedLesson = null;

async function findLessonById(req, res) {
  const { courseId, levelId, lessonId } = req.query;
  
  try {
    const lesson = await lessonService.findLessonById(courseId, levelId, lessonId);
    if (!lesson) {
      res.status(404).json({ message: "Lesson not found" });
    } else {
      lastFetchedLesson = lesson;
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
async function getGlossaryForLesson(req, res) {
  if (lastFetchedLesson) {
    const glossary = {
      lessonId: lastFetchedLesson.lessonId,
      conceptComputerScience: lastFetchedLesson.lessonConcepts.conceptComputerScience,
      conceptScience: lastFetchedLesson.lessonConcepts.conceptScience,
      conceptTech: lastFetchedLesson.lessonConcepts.conceptTech,
      conceptEngineering: lastFetchedLesson.lessonConcepts.conceptEngineering,
      conceptArt: lastFetchedLesson.lessonConcepts.conceptArt,
      conceptMath: lastFetchedLesson.lessonConcepts.conceptMath,
    };
    res.json(glossary);
  } else {
    res.status(404).json({ message: "No lesson found" });
  }
}
async function getQuizData(req, res) {
  if (!lastFetchedLesson) {
    return res.status(404).json({ message: "No lesson found" });
  }

  const {
    rememberCheckQuestionNum,
    undersandCheckQuestionNum,
    applyCheckQuestionNum,
    analyzeCheckQuestionNum,
    evaluateCheckQuestionNum,
    createCheckQuestionNum,
    questionTypes,
    previousConcepts,
    projectTools,
  } = req.body;

  try {
    const quizData = {
      lessonId: lastFetchedLesson.lessonId,
      lessonImage: lastFetchedLesson.lessonImage,
      lessonTopic: lastFetchedLesson.lessonTopic,
      lessonGoal: lastFetchedLesson.lessonGoal,
      levelDescription : lastFetchedLesson.levelDescription,
      projectDescription: lastFetchedLesson.project,
      projectTools,
      conceptComputerScience: lastFetchedLesson.lessonConcepts.conceptComputerScience,
      conceptScience: lastFetchedLesson.lessonConcepts.conceptScience,
      conceptTech: lastFetchedLesson.lessonConcepts.conceptTech,
      conceptEngineering: lastFetchedLesson.lessonConcepts.conceptEngineering,
      conceptArt: lastFetchedLesson.lessonConcepts.conceptArt,
      conceptMath: lastFetchedLesson.lessonConcepts.conceptMath,
      previousConcepts,
      rememberCheckQuestionNum,
      undersandCheckQuestionNum,
      applyCheckQuestionNum,
      analyzeCheckQuestionNum,
      evaluateCheckQuestionNum,
      createCheckQuestionNum,
      questionTypes,
    };

    res.json(quizData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}


module.exports = {
  getAllLessons,
  findLessonById,
  findLessonByName,
  getGlossaryForLesson,
  getQuizData
};
