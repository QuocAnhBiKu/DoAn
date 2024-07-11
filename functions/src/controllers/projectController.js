// controllers/projectController.js

const projectService = require('../service/projectService');

// Hàm getAllProjects: Lấy tất cả các dự án từ dịch vụ projectService và trả về dưới dạng JSON
async function getAllProjects(req, res) {
  try {
    const projects = await projectService.getAllProjects();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Hàm getProjectByName: Lấy dự án theo tên từ dịch vụ projectService và trả về dưới dạng JSON
async function getProjectByName(req, res) {
  const { projectName } = req.params; // Đảm bảo nhận đúng tên dự án từ yêu cầu
  try {
    const projects = await projectService.getProjectByName(projectName);
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Hàm getProjectById: Lấy dự án theo ID từ dịch vụ projectService và trả về dưới dạng JSON
async function getProjectById(req, res) {
  const { projectId } = req.params; // Đảm bảo nhận đúng ID dự án từ yêu cầu
  try {
    const project = await projectService.getProjectById(projectId);
    if (!project) {
      res.status(404).json({ message: 'Không tìm thấy dự án' });
    } else {
      res.json(project);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllProjects,
  getProjectByName,
  getProjectById,
};
