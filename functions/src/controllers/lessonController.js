const lessonService = require("../service/lessonService");

// Hàm getAllLessons: Lấy danh sách tất cả các bài học dựa trên courseId và levelId từ service.
async function getAllLessons(req, res) {
  const { courseId, levelId } = req.query;
  try {
    const lessons = await lessonService.getAllLessons(courseId, levelId);
    res.json(lessons);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi máy chủ nội bộ" });
  }
}

// Hàm findLessonById: Tìm kiếm một bài học dựa trên courseId, levelId và lessonId từ service.
async function findLessonById(req, res) {
  const { courseId, levelId, lessonId } = req.query;
  
  try {
    const lesson = await lessonService.findLessonById(courseId, levelId, lessonId);
    if (!lesson) {
      res.status(404).json({ message: "Không tìm thấy bài học" });
    } else {
      res.json(lesson);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi máy chủ nội bộ" });
  }
}

// Hàm findLessonByName: Tìm kiếm một bài học dựa trên courseId, levelId và lessonName từ service.
async function findLessonByName(req, res) {
  const { courseId, levelId, lessonName } = req.params;
  try {
    const lesson = await lessonService.findLessonByName(courseId, levelId, lessonName);
    if (!lesson) {
      res.status(404).json({ message: "Không tìm thấy bài học" });
    } else {
      res.json(lesson);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi máy chủ nội bộ" });
  }
}

module.exports = {
  getAllLessons,
  findLessonById,
  findLessonByName,
};
