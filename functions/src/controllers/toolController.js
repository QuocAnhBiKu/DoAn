const toolService = require('../service/toolService');

async function getAllTools(req, res) {
  try {
    const tools = await toolService.getAllTools();
    res.json(tools);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllTools,
};