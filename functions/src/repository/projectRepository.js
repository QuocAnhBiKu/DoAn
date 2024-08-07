const { db } = require('../configs/firebaseConfig');
const { collection, getDocs, doc, where, query, getDoc } = require('firebase/firestore');
const Project = require('../model/projectModel');
const toolRepository = require('./toolRepository'); // Import toolRepository

// Hàm lấy tất cả các dự án
async function getAllProjects() {
  const projectsData = [];
  const projectsSnapshot = await getDocs(collection(db, 'Projects'));

  for (const doc of projectsSnapshot.docs) {
    const projectData = doc.data();
    const project = new Project(
      doc.id,
      projectData.projectName,
      projectData.projectDescription,
      projectData.projectRelatedConcepts,
      projectData.projectTools,
      projectData.projectInstruction
    );
    project.tools = await getProjectTools(projectData.projectTools); // Lấy thông tin công cụ cho dự án
    projectsData.push(project);
  }

  return projectsData;
}

// Hàm tìm dự án theo tên
async function getProjectByName(projectName) {
  const projectsData = [];
  const q = query(collection(db, 'Projects'), where('projectName', '==', projectName));
  const projectsSnapshot = await getDocs(q);

  for (const doc of projectsSnapshot.docs) {
    const projectData = doc.data();
    const project = new Project(
      doc.id,
      projectData.projectName,
      projectData.projectDescription,
      projectData.projectRelatedConcepts,
      projectData.projectTools,
      projectData.projectInstruction
    );
    project.tools = await getProjectTools(projectData.projectTools); // Lấy thông tin công cụ cho dự án
    projectsData.push(project);
  }

  return projectsData;
}

// Hàm tìm dự án theo ID
async function getProjectById(projectId) {
  const docRef = doc(db, 'Projects', projectId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const projectData = docSnap.data();
    const project = new Project(
      docSnap.id,
      projectData.projectName,
      projectData.projectDescription,
      projectData.projectRelatedConcepts,
      projectData.projectTools,
      projectData.projectInstruction
    );
    project.tools = await getProjectTools(projectData.projectTools); // Lấy thông tin công cụ cho dự án
    return project;
  } else {
    return null;
  }
}

// Hàm trợ giúp để lấy thông tin công cụ dựa vào ID của chúng
async function getProjectTools(toolIds = []) {
  const tools = [];

  for (const toolId of toolIds) {
    try {
      const tool = await toolRepository.getToolById(toolId);
      if (tool) {
        tools.push(tool);
      } else {
        console.log(`Tool with ID ${toolId} not found.`);
      }
    } catch (error) {
      console.error(`Error fetching tool with ID ${toolId}:`, error);
    }
  }

  return tools;
}

module.exports = {
  getAllProjects, // Xuất hàm lấy tất cả các dự án
  getProjectByName, // Xuất hàm tìm dự án theo tên
  getProjectById, // Xuất hàm tìm dự án theo ID
};
