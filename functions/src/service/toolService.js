// service/toolService.js

const toolRepository = require('../repository/toolRepository');

// Hàm getAllTools: Lấy tất cả công cụ từ kho dữ liệu công cụ thông qua repository
async function getAllTools() {
  return await toolRepository.getAllTools();
}

// Hàm getToolByName: Lấy thông tin công cụ dựa trên tên công cụ từ kho dữ liệu công cụ thông qua repository
async function getToolByName(toolName) {
  return await toolRepository.getToolByName(toolName);
}

// Hàm getToolById: Lấy thông tin công cụ dựa trên ID công cụ từ kho dữ liệu công cụ thông qua repository
async function getToolById(toolId) {
  return await toolRepository.getToolById(toolId);
}

module.exports = {
  getAllTools,
  getToolByName,
  getToolById,
};
