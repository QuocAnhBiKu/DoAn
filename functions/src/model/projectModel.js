class Project {
    constructor(projectId, projectName, projectDescription, projectRelatedConcepts, projectTools, projectInstruction) {
      this.projectId = projectId;
      this.projectName = projectName;
      this.projectDescription = projectDescription;
      this.projectRelatedConcepts = projectRelatedConcepts;
      this.projectTools = projectTools;
      this.projectInstruction = projectInstruction;
    }
  }
  
  module.exports = Project;
  