const lessonService = require("../service/lessonService");
const { quizService, glosarryService, instructionService} = require("../service/chatService");

// Summary
const glossaryController = async (req, res) => {
  const {
    token,
    courseId,
    levelId,
    lessonId,
  } = req.body;

  const user = token;

  try {
    const lesson = await lessonService.findLessonById(courseId, levelId, lessonId);

    const inputs = {
      lessonId,
      conceptComputerScience: lesson.lessonConcepts.conceptComputerScience.join(","),
      conceptScience: lesson.lessonConcepts.conceptScience.join(","),
      conceptTech: lesson.lessonConcepts.conceptTech.join(","),
      conceptEngineering: lesson.lessonConcepts.conceptEngineering.join(","),
      conceptArt: lesson.lessonConcepts.conceptArt.join(","),
      concepMath: lesson.lessonConcepts.conceptMath.join(","),
    };

    console.log('Data sent to glosarryService:', inputs);

    const resBot = await glosarryService(user, inputs);

    res.send(resBot);

  } catch (error) {
    console.error('Error in glossaryController:', error);
    res.status(500).send({ error: 'Internal server error' });
  }
};

// Quiz
const quizController = async (req, res) => {
  const {
    token,
    courseId,
    levelId,
    lessonId,
    rememberCheckQuestionNum,
    understandCheckQuestionNum,
    applyCheckQuestionNum,
    analyzeCheckQuestionNum,
    evaluateCheckQuestionNum,
    createCheckQuestionNum,
    questionTypes,
    previousConcepts,
  } = req.body;

  const user = token;

  const typeQuiz = questionTypes.join(",");

  try {
    const lesson = await lessonService.findLessonById(courseId, levelId, lessonId);
    const typeTools = lesson.project.tools.map(tool => tool.toolName).join(", ");

    const inputs = {
      lessonId,
      lessonImage: lesson.lessonImage,
      lessonTopic: lesson.lessonTopic,
      lessonGoal: lesson.lessonGoal,
      levelDescription: lesson.levelDescription,
      projectDescription: lesson.project.projectDescription,
      projectTools: typeTools,
      // conceptComputerScience: lesson.lessonConcepts.conceptComputerScience.join(","),
      // conceptScience: lesson.lessonConcepts.conceptScience.join(","),
      // conceptTech: lesson.lessonConcepts.conceptTech.join(","),
      // conceptEngineering: lesson.lessonConcepts.conceptEngineering.join(","),
      // conceptArt: lesson.lessonConcepts.conceptArt.join(","),
      // concepMath: lesson.lessonConcepts.conceptMath.join(","),
      previousConcepts,
      rememberCheckQuestionNum,
      understandCheckQuestionNum,
      applyCheckQuestionNum,
      analyzeCheckQuestionNum,
      evaluateCheckQuestionNum,
      createCheckQuestionNum,
      questionTypes: typeQuiz,
    };

    console.log('Data sent to quizService:', inputs);

    const resBot = await quizService(user, inputs);

    if (resBot && resBot.data && resBot.data.status === 'succeeded') {
      res.send(resBot.data.outputs.result.rs);
    } else {
      res.status(400).send({ error: 'Quiz generation failed' });
    }
  } catch (error) {
    console.error('Error in quizController:', error);
    res.status(500).send({ error: 'Internal server error' });
  }
};

// Project Instruction
const instrunctionController = async (req, res) => {
  const {
    token,
    courseId,
    levelId,
    lessonId,
    previousConcepts,
  } = req.body;

  const user = token;

  try {
    const lesson = await lessonService.findLessonById(courseId, levelId, lessonId);
    const typeTools = lesson.project.tools.map(tool => tool.toolName).join(", ");

    const inputs = {
      lessonId,
      lessonImage: lesson.lessonImage,
      lessonTopic: lesson.lessonTopic,
      lessonGoal: lesson.lessonGoal,
      levelDescription: lesson.levelDescription,
      projectDescription: lesson.project.projectDescription,
      projectTools: typeTools,
      conceptComputerScience: lesson.lessonConcepts.conceptComputerScience.join(","),
      conceptScience: lesson.lessonConcepts.conceptScience.join(","),
      conceptTech: lesson.lessonConcepts.conceptTech.join(","),
      conceptEngineering: lesson.lessonConcepts.conceptEngineering.join(","),
      conceptArt: lesson.lessonConcepts.conceptArt.join(","),
      concepMath: lesson.lessonConcepts.conceptMath.join(","),
      previousConcepts,
    };

    console.log('Data sent to instructionService:', inputs);

    const resBot = await instructionService(user, inputs);

    if (resBot && resBot.data && resBot.data.status === 'succeeded') {
      res.send(resBot.data.outputs.result.rs);
    } else {
      res.status(400).send({ error: 'Quiz generation failed' });
    }
  } catch (error) {
    console.error('Error in quizController:', error);
    res.status(500).send({ error: 'Internal server error' });
  }
};

// Activity

module.exports = {quizController, glossaryController, instrunctionController}