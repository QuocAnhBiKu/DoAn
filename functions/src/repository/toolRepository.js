const { db } = require('../configs/firebaseConfig');
const { collection, getDocs, doc, getDoc, where, query } = require('firebase/firestore');
const Tool = require('../model/toolModel');

// Hàm lấy tất cả các công cụ
async function getAllTools() {
  const toolsData = [];
  const toolsSnapshot = await getDocs(collection(db, 'Tools'));

  toolsSnapshot.forEach(doc => {
    const toolData = doc.data();
    const tool = new Tool(
      doc.id,
      toolData.toolName,
      toolData.toolDescription,
      toolData.toolVersion,
      toolData.toolTypes
    );
    toolsData.push(tool);
  });

  return toolsData;
}

// Hàm tìm công cụ theo tên
async function getToolByName(toolName) {
  const toolsData = [];
  const q = query(collection(db, 'Tools'), where('toolName', '==', toolName));
  const toolsSnapshot = await getDocs(q);

  toolsSnapshot.forEach(doc => {
    const toolData = doc.data();
    const tool = new Tool(
      doc.id,
      toolData.toolName,
      toolData.toolDescription,
      toolData.toolVersion,
      toolData.toolTypes
    );
    toolsData.push(tool);
  });

  return toolsData;
}

// Hàm tìm công cụ theo ID
async function getToolById(toolId) {
  const docRef = doc(db, 'Tools', toolId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const toolData = docSnap.data();
    return new Tool(
      docSnap.id,
      toolData.toolName,
      toolData.toolDescription,
      toolData.toolVersion,
      toolData.toolTypes
    );
  } else {
    return null;
  }
}

module.exports = {
  getAllTools, // Xuất hàm lấy tất cả các công cụ
  getToolByName, // Xuất hàm tìm công cụ theo tên
  getToolById, // Xuất hàm tìm công cụ theo ID
};
