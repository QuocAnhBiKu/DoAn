const materialService = require('../service/materialService');

async function getAllMaterials(req, res) {
  try {
    const materials = await materialService.getAllMaterials();
    res.json(materials);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllMaterials,
};