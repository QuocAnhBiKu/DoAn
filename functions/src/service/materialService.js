const materialRepository = require('../repository/materialRepository');

// Hàm getAllMaterials: Lấy tất cả các tài liệu vật liệu từ repository
async function getAllMaterials() {
    return await materialRepository.getAllMaterials();
}

// Hàm findByMaterialId: Tìm tài liệu vật liệu dựa trên ID
async function findByMaterialId(materialId) {
    return await materialRepository.findByMaterialId(materialId);
}

// Hàm findByMaterialName: Tìm tài liệu vật liệu dựa trên tên
async function findByMaterialName(materialName) {
    return await materialRepository.findByMaterialName(materialName);
}

module.exports = {
    getAllMaterials,
    findByMaterialId,
    findByMaterialName,
};
