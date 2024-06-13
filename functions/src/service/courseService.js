const { db } = require('../configs/firebaseConfig');
const { collection, getDocs } = require('firebase/firestore');

async function getAllCourses() {
  const coursesData = [];

  const coursesSnapshot = await getDocs(collection(db, 'Courses'));

  coursesSnapshot.forEach(doc => {
    const course = {
      courseId: doc.id,
      courseName: doc.data().courseName,
      courseDescription: doc.data().courseDescription,
      courseTools: doc.data().courseTools || []
    };
    coursesData.push(course);
  });

  return coursesData;
}

module.exports = {
  getAllCourses,
};
