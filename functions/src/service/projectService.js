// service/projectService.js

const projectRepository = require('../repository/projectRepository');

// Hàm getAllProjects: Lấy danh sách tất cả các dự án từ repository
async function getAllProjects() {
  return await projectRepository.getAllProjects();
}

// Hàm getProjectByName: Lấy thông tin dự án dựa trên tên dự án từ repository
async function getProjectByName(projectName) {
  return await projectRepository.getProjectByName(projectName);
}

// Hàm getProjectById: Lấy thông tin dự án dựa trên ID dự án từ repository
async function getProjectById(projectId) {
  return await projectRepository.getProjectById(projectId);
}

module.exports = {
  getAllProjects,
  getProjectByName,
  getProjectById,
};
