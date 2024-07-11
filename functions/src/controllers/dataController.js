const dataService = require('../service/dataService');

// Hàm getAll: Lấy tất cả dữ liệu từ dịch vụ dataService và trả về trong định dạng JSON
async function getAll(req, res) {
  try {
    const courses = await dataService.getAllData();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Hàm getAllById: Lấy dữ liệu từ dịch vụ dataService dựa trên các thông tin id (courseId, levelId, lessonId) từ request params và trả về kết quả tương ứng
async function getAllById(req, res) {
  try {
    const { courseId, levelId, lessonId } = req.params;
    const data = await dataService.getAllById(courseId, levelId, lessonId);
    res.json(data);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

module.exports = {
  getAll,
  getAllById
};
