const materialRepository = require('../repository/materialRepository');

async function getAllMaterials() {
    return await materialRepository.getAllMaterials();
}

async function findByMaterialId(materialId) {
    return await materialRepository.findByMaterialId(materialId);
}

async function findByMaterialName(materialName) {
    return await materialRepository.findByMaterialName(materialName);
}

module.exports = {
    getAllMaterials,
    findByMaterialId,
    findByMaterialName,
};
