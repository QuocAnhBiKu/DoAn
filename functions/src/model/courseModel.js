class Course {
  constructor(courseId, courseName, courseDescription, courseTools = [],courseLevels = {}) {
    this.courseId = courseId;
    this.courseName = courseName;
    this.courseDescription = courseDescription;
    this.courseTools = courseTools;
    this.courseLevels= courseLevels || {} ;
  }
}

module.exports = Course;
