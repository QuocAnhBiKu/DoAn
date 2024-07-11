// controllers/toolController.js

const toolService = require('../service/toolService');

// Hàm getAllTools: Lấy danh sách tất cả các công cụ từ service và trả về dưới dạng JSON
async function getAllTools(req, res) {
  try {
    const tools = await toolService.getAllTools();
    res.json(tools);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Hàm getToolByName: Lấy thông tin công cụ dựa trên tên công cụ từ service và trả về dưới dạng JSON
async function getToolByName(req, res) {
  const { toolName } = req.params;
  try {
    const tools = await toolService.getToolByName(toolName);
    res.json(tools);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Hàm getToolById: Lấy thông tin công cụ dựa trên ID công cụ từ service và trả về dưới dạng JSON
async function getToolById(req, res) {
  const { toolId } = req.params;
  try {
    const tool = await toolService.getToolById(toolId);
    if (!tool) {
      res.status(404).json({ message: 'Tool not found' });
    } else {
      res.json(tool);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllTools,
  getToolByName,
  getToolById,
};
