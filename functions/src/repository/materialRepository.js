const { db } = require('../configs/firebaseConfig');
const { collection, getDocs, doc, getDoc, query, where } = require('firebase/firestore');
const Material = require('../model/materialModel');

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

async function findByMaterialId(materialId) {
    const materialDoc = await getDoc(doc(db, 'Materials', materialId));

    if (!materialDoc.exists()) {
        throw new Error('Material not found');
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
    getAllMaterials,
    findByMaterialId,
    findByMaterialName,
};
