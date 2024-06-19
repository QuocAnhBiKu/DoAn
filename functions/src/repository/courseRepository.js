// repositories/courseRepository.js
const { db } = require('../configs/firebaseConfig');
const { collection, getDocs, doc, getDoc, query, where } = require('firebase/firestore');
const Course = require('../model/courseModel');
const levelRepository = require('./levelRepository');
const lessonRepository = require('./lessonRepository');
const toolRepository = require('./toolRepository');

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

      // Lấy thông tin công cụ cho mỗi toolId trong courseTools
      const toolPromises = (doc.data().courseTools || []).map(async (toolId) => {
        const tool = await toolRepository.getToolById(toolId);
        return tool;
      });
      const toolsData = await Promise.all(toolPromises);
      course.courseTools = toolsData.filter(Boolean); // Lọc ra các tool không null

      // Lấy thông tin level cho khóa học
      const levels = await levelRepository.getAllLevelsForCourseWithDetails(doc.id);

      // Lấy thông tin lesson cho mỗi level
      const levelsWithLessons = await Promise.all(
        levels.map(async (level) => {
          const lessons = await lessonRepository.getAllLessonsForLevelWithDetails(doc.id, level.levelId);
          level.lessons = lessons;
          return level;
        })
      );

      coursesData.push({
        course: course,
        levels: levelsWithLessons
      });
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
    try {
      const coursesData = [];
      const coursesSnapshot = await getDocs(this.coursesCollection);
  
      const coursePromises = coursesSnapshot.docs.map(async doc => {
        const courseData = doc.data();
        const courseId = doc.id; // Lấy id của course từ doc
        const course = new Course(
          courseId,
          courseData.courseName,
          courseData.courseDescription,
          courseData.courseTools || [],
          courseData.courseLevels || {}
        );
  
        // Lấy thông tin công cụ cho mỗi toolId trong courseTools
        const toolPromises = (courseData.courseTools || []).map(toolId => toolRepository.getToolById(toolId));
        const toolsData = await Promise.all(toolPromises);
        course.courseTools = toolsData.filter(tool => tool !== null);
  
        // Lấy tên của các level từ ID và gán vào course.courseLevels
        const levelPromises = (courseData.courseLevels || []).map(levelId => levelRepository.findLevelById(courseId, levelId)); // Sử dụng courseId
        const levelsData = await Promise.all(levelPromises);
        course.courseLevels = levelsData.filter(level => level !== null).map(level => level.levelName);
  
        coursesData.push(course);
      });
  
      await Promise.all(coursePromises);
  
      return coursesData;
    } catch (error) {
      console.error('Error in getAllCourses:', error);
      throw error; // Throw the error to propagate it up
    }
  }
  
  async findByCourseId(courseId) {
    try {
      const courseDoc = await getDoc(doc(this.coursesCollection, courseId));
  
      if (!courseDoc.exists()) {
        return null;
      }
  
      const courseData = courseDoc.data();
      const course = new Course(
        courseDoc.id,
        courseData.courseName,
        courseData.courseDescription,
        courseData.courseTools || [],
        courseData.courseLevels || {}
      );
  
      // Lấy thông tin công cụ cho mỗi toolId trong courseTools
      const toolPromises = (courseData.courseTools || []).map(toolId => toolRepository.getToolById(toolId));
      const toolsData = await Promise.all(toolPromises);
      course.courseTools = toolsData.filter(tool => tool !== null);
  
      // Lấy tên của các level từ ID và gán vào course.courseLevels
      const levelPromises = (courseData.courseLevels || []).map(levelId => levelRepository.findLevelById(courseId, levelId)); // Sử dụng courseId
      const levelsData = await Promise.all(levelPromises);
      course.courseLevels = levelsData.filter(level => level !== null).map(level => level.levelName);
  
      return course;
    } catch (error) {
      console.error('Error in findByCourseId:', error);
      throw error; // Throw the error to propagate it up
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
