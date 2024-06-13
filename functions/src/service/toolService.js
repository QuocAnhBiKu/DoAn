const { db } = require('../configs/firebaseConfig');
const { collection, getDocs, doc, getDoc } = require('firebase/firestore');

async function getAllTools() {
  const toolsData = [];
  const toolsSnapshot = await getDocs(collection(db, 'Tools'));

  toolsSnapshot.forEach(doc => {
    toolsData.push({ id: doc.id, ...doc.data() });
  });

  return toolsData;
}

module.exports = {
  getAllTools,
};