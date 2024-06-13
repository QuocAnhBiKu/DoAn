const { db } = require('../configs/firebaseConfig');
const { collection, getDocs, doc, getDoc } = require('firebase/firestore');

async function getAllProjects() {
    const projectsData = [];
    const projectsSnapshot = await getDocs(collection(db, 'Projects'));
  
    projectsSnapshot.forEach(doc => {
      projectsData.push({ id: doc.id, ...doc.data() });
    });
  
    return projectsData;
  }
  
  module.exports = {
    getAllProjects,
  };