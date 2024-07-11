const lessonService = require("../service/lessonService");
const { quizService, glosarryService, instructionService } = require("../service/chatService");

// Controller cho Summary
const glossaryController = async (req, res) => {
  const {
    token,
    courseId,
    levelId,
    lessonId,
  } = req.body;

  const user = token;

  try {
    // Tìm kiếm thông tin bài học dựa trên courseId, levelId, lessonId
    const lesson = await lessonService.findLessonById(courseId, levelId, lessonId);

    // Chuẩn bị các thông tin đầu vào cho glosarryService
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

    // Gọi glosarryService để tạo từ điển thuật ngữ
    const resBot = await glosarryService(user, inputs);

    res.send(resBot); // Trả về kết quả từ glosarryService

  } catch (error) {
    console.error('Error in glossaryController:', error);
    res.status(500).send({ error: 'Internal server error' });
  }
};

// Controller cho Quiz
const quizController = async (req, res) => {
  const {
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

  const user = req.userEmail; // Lấy thông tin user từ request

  const typeQuiz = questionTypes.join(","); // Chuyển đổi các loại câu hỏi thành chuỗi

  try {
    // Tìm kiếm thông tin bài học dựa trên courseId, levelId, lessonId
    const lesson = await lessonService.findLessonById(courseId, levelId, lessonId);
    const typeTools = lesson.project.tools.map(tool => tool.toolName).join(", "); // Lấy danh sách công cụ từ dự án

    // Chuẩn bị các thông tin đầu vào cho quizService
    const inputs = {
      lessonId,
      lessonImage: lesson.lessonImage,
      lessonTopic: lesson.lessonTopic,
      lessonGoal: lesson.lessonGoal,
      levelDescription: lesson.levelDescription,
      projectDescription: lesson.project.projectDescription,
      projectTools: typeTools,
      // conceptComputerScience: lesson.lessonConcepts.conceptComputerScience,
      // conceptScience: lesson.lessonConcepts.conceptScience,
      // conceptTech: lesson.lessonConcepts.conceptTech,
      // conceptEngineering: lesson.lessonConcepts.conceptEngineering,
      // conceptArt: lesson.lessonConcepts.conceptArt,
      // conceptMath: lesson.lessonConcepts.conceptMath,
      previousConcepts,
      rememberCheckQuestionNum,
      understandCheckQuestionNum,
      applyCheckQuestionNum,
      analyzeCheckQuestionNum,
      evaluateCheckQuestionNum,
      createCheckQuestionNum,
      questionTypes: typeQuiz,
    };

    // Gọi quizService để tạo bài kiểm tra
    const resBot = await quizService(user, inputs);

    if (resBot && resBot.data && resBot.data.status === 'succeeded') {
      res.send(resBot.data.outputs.result); // Trả về kết quả từ quizService nếu thành công
    } else {
      console.log(resBot);
      res.send(resBot); // Trả về kết quả từ quizService nếu không thành công
    }
  } catch (error) {
    console.error('Error in quizController:', error);
    res.status(500).send({ error: 'Internal server error' });
  }
};

// Controller cho Project Instruction
const instructionController = async (req, res) => {
  const {
    token,
    courseId,
    levelId,
    lessonId,
    previousConcepts,
  } = req.body;

  const user = token; // Lấy thông tin user từ token

  try {
    // Tìm kiếm thông tin bài học dựa trên courseId, levelId, lessonId
    const lesson = await lessonService.findLessonById(courseId, levelId, lessonId);
    const typeTools = lesson.project.tools.map(tool => tool.toolName).join(", "); // Lấy danh sách công cụ từ dự án

    // Chuẩn bị các thông tin đầu vào cho instructionService
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

    // Gọi instructionService để tạo hướng dẫn dự án
    const resBot = await instructionService(user, inputs);

    if (resBot && resBot.data && resBot.data.status === 'succeeded') {
      res.send(resBot.data.outputs.result.rs); // Trả về kết quả từ instructionService nếu thành công
    } else {
      res.status(400).send({ error: 'Quiz generation failed' }); // Trả về lỗi nếu không thành công
    }
  } catch (error) {
    console.error('Error in instructionController:', error);
    res.status(500).send({ error: 'Internal server error' });
  }
};

module.exports = { quizController, glossaryController, instructionController };
