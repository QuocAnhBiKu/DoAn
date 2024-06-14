// models/Level.js

class Level {
    constructor(levelId, levelName, levelDescription, levelTools, levelLessons) {
      this.levelId = levelId;
      this.levelName = levelName;
      this.levelDescription = levelDescription;
      this.levelTools = levelTools 
      this.levelLessons = levelLessons || {}; // Defaults to empty object if not provided
    }
  }
  
  module.exports = Level;
  