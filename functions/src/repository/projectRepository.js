// repository/projectRepository.js

const { db } = require('../configs/firebaseConfig');
const { collection, getDocs, doc, where, query, getDoc } = require('firebase/firestore');
const Project = require('../model/projectModel');

async function getAllProjects() {
  const projectsData = [];
  const projectsSnapshot = await getDocs(collection(db, 'Projects'));

  projectsSnapshot.forEach(doc => {
    const projectData = doc.data();
    const project = new Project(
      doc.id,
      projectData.projectName,
      projectData.projectDescription,
      projectData.projectRelatedConcepts,
      projectData.projectTools,
      projectData.projectInstruction
    );
    projectsData.push(project);
  });

  return projectsData;
}

async function getProjectByName(projectName) {
  const projectsData = [];
  const q = query(collection(db, 'Projects'), where('projectName', '==', projectName));
  const projectsSnapshot = await getDocs(q);

  projectsSnapshot.forEach(doc => {
    const projectData = doc.data();
    const project = new Project(
      doc.id,
      projectData.projectName,
      projectData.projectDescription,
      projectData.projectRelatedConcepts,
      projectData.projectTools,
      projectData.projectInstruction
    );
    projectsData.push(project);
  });

  return projectsData;
}

async function getProjectById(projectId) {
  const docRef = doc(db, 'Projects', projectId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const projectData = docSnap.data();
    return new Project(
      docSnap.id,
      projectData.projectName,
      projectData.projectDescription,
      projectData.projectRelatedConcepts,
      projectData.projectTools,
      projectData.projectInstruction
    );
  } else {
    return null;
  }
}

module.exports = {
  getAllProjects,
  getProjectByName,
  getProjectById,
};
