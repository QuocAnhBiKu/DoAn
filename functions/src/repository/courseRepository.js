// repositories/courseRepository.js
const { db } = require('../configs/firebaseConfig');
const { collection, getDocs, doc, getDoc, query, where } = require('firebase/firestore');
const Course = require('../model/courseModel');
const levelRepository = require('./levelRepository');
const lessonRepository = require('./lessonRepository');

class CourseRepository {
  constructor() {
    this.coursesCollection = collection(db, 'Courses');
  }
  async getAllCoursesWithDetails() {
    const coursesData = [];
    const coursesSnapshot = await getDocs(this.coursesCollection);

    for (const doc of coursesSnapshot.docs) {
      const course = new Course(
        doc.id,
        doc.data().courseName,
        doc.data().courseDescription,
        doc.data().courseTools || [],
        doc.data().courseLevels || {}
      );
      course.levels = await levelRepository.getAllLevelsForCourseWithDetails(doc.id);
      coursesData.push(course);
    }

    return coursesData;
  }
  async findByIdData(courseId, levelId, lessonId) {
    const course = await this.findByCourseId(courseId);
    if (!course) return null;
  
    const level = await levelRepository.findLevelById(courseId, levelId);
    if (level) {
      const lesson = await lessonRepository.findLessonById(courseId, levelId, lessonId);
      if (lesson) {
        return {
          course: course,
          level: level,
          lesson: lesson
        };
      }
    }
  
    return null;
  }

  async getAllCourses() {
    const coursesData = [];
    const coursesSnapshot = await getDocs(this.coursesCollection);

    coursesSnapshot.forEach(doc => {
      const course = new Course(
        doc.id,
        doc.data().courseName,
        doc.data().courseDescription,
        doc.data().courseTools || [],
        doc.data().courseLevels || {}
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
        courseData.courseTools || [],
        courseData.courseLevels || {}
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
        courseData.courseTools || [],
        courseData.courseLevels || {}
      ));
    });

    return courses;
  }
}

module.exports = CourseRepository;
