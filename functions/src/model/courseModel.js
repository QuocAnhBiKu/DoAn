// models/Course.js
class Course {
  constructor(courseId, courseName, courseDescription, courseTools = []) {
    this.courseId = courseId;
    this.courseName = courseName;
    this.courseDescription = courseDescription;
    this.courseTools = courseTools;
  }
}

module.exports = Course;
