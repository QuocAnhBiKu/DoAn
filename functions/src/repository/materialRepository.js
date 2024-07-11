const { db } = require('../configs/firebaseConfig');
const { collection, getDocs, doc, getDoc, query, where } = require('firebase/firestore');
const Material = require('../model/materialModel');

// Hàm lấy tất cả các tài liệu
async function getAllMaterials() {
    const materialsData = [];
    const materialsSnapshot = await getDocs(collection(db, 'Materials'));

    materialsSnapshot.forEach(doc => {
        const material = new Material(
            doc.id,
            doc.data().lessonName,
            doc.data().materialName,
            doc.data().materialType,
            doc.data().materialLink
        );
        materialsData.push(material);
    });

    return materialsData;
}

// Hàm tìm tài liệu theo ID
async function findByMaterialId(materialId) {
    const materialDoc = await getDoc(doc(db, 'Materials', materialId));

    if (!materialDoc.exists()) {
        return null; // Trả về null thay vì ném lỗi
    }

    const materialData = materialDoc.data();
    const material = new Material(
        materialDoc.id,
        materialData.lessonName,
        materialData.materialName,
        materialData.materialType,
        materialData.materialLink
    );

    return material;
}

// Hàm tìm tài liệu theo tên
async function findByMaterialName(materialName) {
    const materialsSnapshot = await getDocs(query(collection(db, 'Materials'), where('materialName', '==', materialName)));
    const materialsData = [];

    materialsSnapshot.forEach(doc => {
        const material = new Material(
            doc.id,
            doc.data().lessonName,
            doc.data().materialName,
            doc.data().materialType,
            doc.data().materialLink
        );
        materialsData.push(material);
    });

    return materialsData;
}

module.exports = {
    getAllMaterials, // Xuất hàm lấy tất cả các tài liệu
    findByMaterialId, // Xuất hàm tìm tài liệu theo ID
    findByMaterialName, // Xuất hàm tìm tài liệu theo tên
};
