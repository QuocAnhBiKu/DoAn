// repository/toolRepository.js

const { db } = require('../configs/firebaseConfig');
const { collection, getDocs, doc, getDoc, where, query } = require('firebase/firestore');
const Tool = require('../model/toolModel');

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
  getAllTools,
  getToolByName,
  getToolById,
};
