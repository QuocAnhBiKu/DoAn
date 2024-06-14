const { db } = require('../configs/firebaseConfig');
const { collection, getDocs, doc, getDoc } = require('firebase/firestore');

async function getAllMaterials() {
    const projectsData = [];
    const projectsSnapshot = await getDocs(collection(db, 'Materials'));
  
    projectsSnapshot.forEach(doc => {
      projectsData.push({ id: doc.id, ...doc.data() });
    });
  
    return projectsData;
  }
  
  module.exports = {
    getAllMaterials,
  };