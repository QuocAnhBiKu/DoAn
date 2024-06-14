const { db } = require("../configs/firebaseConfig");
const { collection, getDocs, where, query } = require("firebase/firestore");
const Lesson = require("../model/lessonModel");

async function getAllLessons(courseId, levelId) {
  const lessonsData = [];

  const lessonsSnapshot = await getDocs(
    collection(db, "Courses", courseId, "Levels", levelId, "Lessons")
  );

  lessonsSnapshot.forEach((doc) => {
    const lesson = new Lesson(doc);
    lessonsData.push(lesson);
  });

  return lessonsData;
}

async function findLessonById(courseId, levelId, lessonId) {
  const lessonsRef = collection(
    db,
    "Courses",
    courseId,
    "Levels",
    levelId,
    "Lessons"
  );
  const lessonQuery = query(lessonsRef, where("lessonId", "==", lessonId));
  const lessonSnapshot = await getDocs(lessonQuery);

  if (lessonSnapshot.empty) {
    return null;
  }

  const doc = lessonSnapshot.docs[0];
  return new Lesson(doc);
}

async function findLessonByName(courseId, levelId, lessonName) {
  const lessonsRef = collection(
    db,
    "Courses",
    courseId,
    "Levels",
    levelId,
    "Lessons"
  );
  const lessonQuery = query(lessonsRef, where("lessonName", "==", lessonName));
  const lessonSnapshot = await getDocs(lessonQuery);

  if (lessonSnapshot.empty) {
    return null;
  }

  const doc = lessonSnapshot.docs[0];
  return new Lesson(doc);
}

module.exports = {
  getAllLessons,
  findLessonById,
  findLessonByName,
};
