const xlsx = require("xlsx");
const { db }= require("../src/configs/firebaseConfig");
const { collection, setDoc, doc } = require("firebase/firestore");

// Function to read Excel file and store data in Firestore
const readExcelAndStoreInFirestore = async (filePath) => {
  try {
    // Read the Excel file
    const workbook = xlsx.readFile(filePath);

    // Process 'Course' sheet
    const courseSheet = workbook.Sheets['Courses'];
    const courseData = xlsx.utils.sheet_to_json(courseSheet, { header: 1 });

    // Process 'Level' sheet
    const levelSheet = workbook.Sheets['Levels'];
    const levelData = xlsx.utils.sheet_to_json(levelSheet, { header: 1 });

    // Process 'Lesson' sheet
    const lessonSheet = workbook.Sheets['Lessons'];
    const lessonData = xlsx.utils.sheet_to_json(lessonSheet, { header: 1 });

    // Process 'Course' sheet
    for (let i = 1; i < courseData.length; i++) { // Start from 1 to skip headers
      const courseRow = courseData[i];

      // Map the course data to Firestore fields
      const courseDocData = {
        courseId: courseRow[0],
        courseName: courseRow[1],
        courseDescription: courseRow[2],
        courseTools: courseRow[3] ? courseRow[3].split(",").map(item => item.trim()) : [],
        courseLevels: courseRow[4] ? courseRow[4].split(",").map(item => item.trim()) : [],
      };

      // Check for undefined fields and skip the row if any field is undefined
      if (Object.values(courseDocData).some((value) => value === undefined)) {
        console.warn(`Skipping row ${i + 1} in Course sheet due to undefined fields:`, courseDocData);
        continue;
      }

      // Save to Firestore in 'courses' collection with courseId as document ID
      const courseId = `${courseRow[0]}`;
      const courseRef = doc(collection(db, 'Courses'), courseId);
      await setDoc(courseRef, courseDocData);

      // Process corresponding levels and lessons
      // Filter levels for the current course
      const levelsForCourse = levelData.filter(level => level[1] === courseId);
      for (let j = 0; j < levelsForCourse.length; j++) {
        const levelRow = levelsForCourse[j];
        
        // Map level data to Firestore fields
        const levelDocData = {
          levelId: levelRow[0],
          courseId: levelRow[1],
          levelName: levelRow[2],
          levelDescription: levelRow[3],
          levelTools: levelRow[4] ? levelRow[4].split(",").map(item => item.trim()) : [],
          levelLessons: levelRow[5] ? levelRow[5].split(",").map(item => item.trim()) : [],
        };

        // Save to Firestore in 'courses/{courseId}/levels' subcollection with levelId as document ID
        const levelId = `${levelRow[0]}`;
        const levelRef = doc(collection(courseRef, 'Levels'), levelId);
        await setDoc(levelRef, levelDocData);

        // Filter lessons for the current level
        const lessonsForLevel = lessonData.filter(lesson =>
          lesson[1] === courseId && levelDocData.levelLessons.includes(lesson[0])
        );
        for (let k = 0; k < lessonsForLevel.length; k++) {
          const lessonRow = lessonsForLevel[k];

          // Map lesson data to Firestore fields
          const lessonDocData = {
            lessonId: lessonRow[0],
            courseId: lessonRow[1],
            levelId: lessonRow[2],
            lessonName: lessonRow[3],
            lessonNumber: lessonRow[4],
            lessonImage: lessonRow[5],
            lessonTopic: lessonRow[6],
            lessonGoal: lessonRow[7],
            lessonTools: lessonRow[8] ? lessonRow[8].split(",").map(item => item.trim()) : [],
            projectId: lessonRow[9],
            conceptComputerScience: lessonRow[10] ? lessonRow[10].split(",").map(item => item.trim()) : [],
            conceptScience: lessonRow[11] ? lessonRow[11].split(",").map(item => item.trim()) : [],
            conceptTech: lessonRow[12] ? lessonRow[12].split(",").map(item => item.trim()) : [],
            conceptEngineering: lessonRow[13] ? lessonRow[13].split(",").map(item => item.trim()) : [],
            conceptArt: lessonRow[14] ? lessonRow[14].split(",").map(item => item.trim()) : [],
            conceptMath: lessonRow[15] ? lessonRow[15].split(",").map(item => item.trim()) : [],
            conceptSkill: lessonRow[16] ? lessonRow[16].split(",").map(item => item.trim()) : [],
            lessonPlanId: lessonRow[17],
            slideId: lessonRow[18],
            summaryId: lessonRow[19],
            quizId: lessonRow[20],
            videoId: lessonRow[21],
          };

          // Save to Firestore in 'courses/{courseId}/levels/{levelId}/lessons' subcollection with lessonId as document ID
          const lessonId = `${lessonRow[0]}`;
          const lessonRef = doc(collection(levelRef, 'Lessons'), lessonId);
          await setDoc(lessonRef, lessonDocData);
        }
      }
    }

    console.log("Data successfully written to Firestore");
  } catch (error) {
    console.error("Error reading Excel file or writing to Firestore:", error);
  }
};

// Call the function with the path to your Excel file
readExcelAndStoreInFirestore("./courseInfoStructure.xlsx");
