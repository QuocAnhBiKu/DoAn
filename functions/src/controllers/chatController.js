const lessonService = require("../service/lessonService");
const { quizService } = require("../service/chatService");

const quizController = async(req, res) => {
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

  const lesson = await lessonService.findLessonById(courseId, levelId, lessonId);
  
  const resBot = await quizService(user, {
    lessonId,
    lessonImage: lesson.lessonImage,
    lessonGoal:lesson.lessonGoal,
    lessonTopic:lesson.lessonTopic,
    levelDescription: lesson.levelDescription,
    projectTools: lesson.projectTools,
    projectDescription: lesson.project.projectDescription,
    understandCheckQuestionNum,
    analyzeCheckQuestionNum,
    applyCheckQuestionNum,
    createCheckQuestionNum,
    evaluateCheckQuestionNum,
    questionTypes: typeQuiz,
    previousConcepts,
    rememberCheckQuestionNum,
  });
  res.send(resBot);


}

module.exports = {quizController}