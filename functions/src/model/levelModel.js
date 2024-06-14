class Level {
    constructor(levelId, courseId, levelName, levelDescription, levelTools = [], levelLessons = {}) {
      this.levelId = levelId;
      this.courseId = courseId;
      this.levelName = levelName;
      this.levelDescription = levelDescription;
      this.levelTools = levelTools;
      this.levelLessons = levelLessons;
    }
  }
  
  module.exports = Level;