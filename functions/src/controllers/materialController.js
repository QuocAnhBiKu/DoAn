const materialService = require('../service/materialService');

// Hàm getAllMaterials: Lấy tất cả các tài liệu từ dịch vụ materialService và trả về dưới dạng JSON
async function getAllMaterials(req, res) {
    try {
        const materials = await materialService.getAllMaterials();
        res.json(materials);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Hàm findByMaterialId: Tìm tài liệu theo ID từ dịch vụ materialService và trả về dưới dạng JSON
async function findByMaterialId(req, res) {
    const materialId = req.params.materialId;

    try {
        const material = await materialService.findByMaterialId(materialId);
        res.json(material);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

// Hàm findByMaterialName: Tìm tài liệu theo tên từ dịch vụ materialService và trả về dưới dạng JSON
async function findByMaterialName(req, res) {
    const materialName = req.params.materialName;

    try {
        const materials = await materialService.findByMaterialName(materialName);
        res.json(materials);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

module.exports = {
    getAllMaterials,
    findByMaterialId,
    findByMaterialName,
};
