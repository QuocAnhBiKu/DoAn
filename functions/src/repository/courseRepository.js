// repositories/courseRepository.js
const { db } = require('../configs/firebaseConfig');
const { collection, getDocs, doc, getDoc, query, where } = require('firebase/firestore');
const Course = require('../model/courseModel');

class CourseRepository {
  constructor() {
    this.coursesCollection = collection(db, 'Courses');
  }

  async getAllCourses() {
    const coursesData = [];
    const coursesSnapshot = await getDocs(this.coursesCollection);

    coursesSnapshot.forEach(doc => {
      const course = new Course(
        doc.id,
        doc.data().courseName,
        doc.data().courseDescription,
        doc.data().courseTools || []
      );
      coursesData.push(course);
    });

    return coursesData;
  }

  async findByCourseId(courseId) {
    const courseDoc = await getDoc(doc(this.coursesCollection, courseId));
    if (courseDoc.exists()) {
      const courseData = courseDoc.data();
      return new Course(
        courseDoc.id,
        courseData.courseName,
        courseData.courseDescription,
        courseData.courseTools || []
      );
    } else {
      return null;
    }
  }

  async findByCourseName(courseName) {
    const coursesQuery = query(this.coursesCollection, where('courseName', '==', courseName));
    const coursesSnapshot = await getDocs(coursesQuery);

    const courses = [];
    coursesSnapshot.forEach(doc => {
      const courseData = doc.data();
      courses.push(new Course(
        doc.id,
        courseData.courseName,
        courseData.courseDescription,
        courseData.courseTools || []
      ));
    });

    return courses;
  }
}

module.exports = CourseRepository;
