// Endpoint API
const coursesEndpoint = "http://localhost:3000/api/courses";
const levelsEndpoint = "http://localhost:3000/api/levels/";
const lessonsEndpoint = "http://localhost:3000/api/lessons/";
const courseInfoEndpoint = "http://localhost:3000/api/courses/id/";
const levelInfoEndpoint = "http://localhost:3000/api/levels/id/";
const lessonInfoEndpoint = "http://localhost:3000/api/lessons/id/";

// Function to fetch courses from the API
async function fetchCourses() {
  try {
    const response = await fetch(coursesEndpoint);
    const courses = await response.json();
    return courses;
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
}

// Function to fetch levels from the API
async function fetchLevels(courseId) {
  try {
    const response = await fetch(`${levelsEndpoint}${courseId}`);
    const levels = await response.json();
    return levels;
  } catch (error) {
    console.error("Error fetching levels:", error);
    return [];
  }
}

// Function to fetch lessons from the API
async function fetchLessons(courseId, levelId) {
  try {
    const response = await fetch(`${lessonsEndpoint}${courseId}/${levelId}`);
    const lessons = await response.json();
    return lessons;
  } catch (error) {
    console.error("Error fetching lessons:", error);
    return [];
  }
}

// Function to fetch course info from the API
async function fetchCourseInfo(courseId) {
  try {
    const response = await fetch(`${courseInfoEndpoint}${courseId}`);
    const courseInfo = await response.json();
    return courseInfo;
  } catch (error) {
    console.error("Error fetching course info:", error);
    return null;
  }
}

// Function to fetch level info from the API
async function fetchLevelInfo(courseId, levelId) {
  try {
    const response = await fetch(`${levelInfoEndpoint}${courseId}/${levelId}`);
    const levelInfo = await response.json();
    return levelInfo;
  } catch (error) {
    console.error("Error fetching level info:", error);
    return null;
  }
}

// Function to fetch lesson info from the API
async function fetchLessonInfo(courseId, levelId, lessonId) {
  try {
    const response = await fetch(`${lessonInfoEndpoint}${courseId}/${levelId}/${lessonId}`);
    const lessonInfo = await response.json();
    return lessonInfo;
  } catch (error) {
    console.error("Error fetching lesson info:", error);
    return null;
  }
}

// Function to populate course dropdown
async function populateCourses() {
  const courses = await fetchCourses();
  const courseSelect = document.getElementById("course");
  courseSelect.innerHTML = '<option value="" disabled selected>Select Course</option>';
  courses.forEach(course => {
    const option = document.createElement("option");
    option.value = course.courseId;
    option.text = course.courseName;
    courseSelect.add(option);
  });
}

// Function to populate level dropdown
async function populateLevels(courseId) {
  const levels = await fetchLevels(courseId);
  const levelSelect = document.getElementById("level");
  levelSelect.innerHTML = '<option value="" disabled selected>Select Level</option>';
  levels.forEach(level => {
    const option = document.createElement("option");
    option.value = level.levelId;
    option.text = level.levelName;
    levelSelect.add(option);
  });
}

// Function to populate lesson dropdown
async function populateLessons(courseId, levelId) {
  const lessons = await fetchLessons(courseId, levelId);
  const lessonSelect = document.getElementById("lessonName");
  lessonSelect.innerHTML = '<option value="" disabled selected>Select Lesson</option>';
  lessons.forEach(lesson => {
    const option = document.createElement("option");
    option.value = lesson.lessonId;
    option.text = lesson.lessonName;
    lessonSelect.add(option);
  });
}

// Function to update course info
async function updateCourseInfo(courseId) {
  const courseInfo = await fetchCourseInfo(courseId);
  if (courseInfo) {
    const courseInfoContainer = document.getElementById("courseInfoContainer");
    courseInfoContainer.innerHTML = `
      <h2>${courseInfo.courseName}</h2>
      <p><strong>Course Description:</strong> ${courseInfo.courseDescription}</p>
      <p><strong>Course Tools:</strong></p>
      <ul>${courseInfo.courseTools.map(tool => `<li>${tool}</li>`).join('')}</ul>
      <p><strong>Course Levels:</strong></p>
      <ul>${courseInfo.courseLevels.map(level => `<li>${level}</li>`).join('')}</ul>
    `;
  } else {
    console.error("Failed to update course info");
  }
}

// Function to update level info
async function updateLevelInfo(courseId, levelId) {
  const levelInfo = await fetchLevelInfo(courseId, levelId);
  if (levelInfo) {
    const levelInfoContainer = document.getElementById("levelInfoContainer");
    levelInfoContainer.innerHTML = `
      <h2>${levelInfo.levelName}</h2>
      <p><strong>Level Description:</strong> ${levelInfo.levelDescription}</p>
      <p><strong>Level Objectives:</strong></p>
      <ul>${levelInfo.levelObjectives.map(obj => `<li>${obj}</li>`).join('')}</ul>
    `;
  } else {
    console.error("Failed to update level info");
  }
}

// Function to update lesson info
async function updateLessonInfo(courseId, levelId, lessonId) {
  const lessonInfo = await fetchLessonInfo(courseId, levelId, lessonId);
  if (lessonInfo) {
    const lessonInfoContainer = document.getElementById("lessonInfoContainer");
    lessonInfoContainer.innerHTML = `
      <h2>${lessonInfo.lessonName}</h2>
      <p><strong>Lesson Description:</strong> ${lessonInfo.lessonDescription}</p>
      <p><strong>Lesson Materials:</strong></p>
      <ul>${lessonInfo.lessonMaterials.map(mat => `<li>${mat}</li>`).join('')}</ul>
    `;
  } else {
    console.error("Failed to update lesson info");
  }
}

// Call populateCourses on page load
window.onload = () => {
  populateCourses();
};

// Function to handle Course change
async function handleCourseChange() {
  const selectedCourseId = document.getElementById("course").value;
  const courseInfoButton = document.getElementById("courseInfoButton");

  const levelSelect = document.getElementById("level");
  const lessonSelect = document.getElementById("lessonName");
  const levelInfoButton = document.getElementById("levelInfoButton");
  const lessonInfoButton = document.getElementById("lessonInfoButton");

  // Reset level and lesson selections and buttons
  levelSelect.disabled = true;
  levelSelect.innerHTML = '<option value="" disabled selected>Select Level</option>';
  lessonSelect.disabled = true;
  lessonSelect.innerHTML = '<option value="" disabled selected>Select Lesson</option>';

  // Reset info buttons
  levelInfoButton.classList.remove("active");
  lessonInfoButton.classList.remove("active");

  if (selectedCourseId) {
    levelSelect.disabled = false;
    await populateLevels(selectedCourseId);
    courseInfoButton.classList.add("active");
    updateCourseInfo(selectedCourseId); // Fetch and display course info
  } else {
    courseInfoButton.classList.remove("active");
  }
}

// Function to handle Level change
async function handleLevelChange() {
  const selectedCourseId = document.getElementById("course").value;
  const selectedLevelId = document.getElementById("level").value;
  const levelInfoButton = document.getElementById("levelInfoButton");
  const lessonSelect = document.getElementById("lessonName");
  const lessonInfoButton = document.getElementById("lessonInfoButton");

  // Reset lesson selection and button
  lessonSelect.disabled = true;
  lessonSelect.innerHTML = '<option value="" disabled selected>Select Lesson</option>';
  lessonInfoButton.classList.remove("active");

  if (selectedLevelId) {
    lessonSelect.disabled = false;
    await populateLessons(selectedCourseId, selectedLevelId);
    levelInfoButton.classList.add("active");
    updateLevelInfo(selectedCourseId, selectedLevelId); // Fetch and display level info
  } else {
    levelInfoButton.classList.remove("active");
  }
}

// Function to handle Lesson change
async function handleLessonChange() {
  const selectedCourseId = document.getElementById("course").value;
  const selectedLevelId = document.getElementById("level").value;
  const selectedLessonId = document.getElementById("lessonName").value;
  const lessonInfoButton = document.getElementById("lessonInfoButton");

  if (selectedLessonId) {
    lessonInfoButton.classList.add("active");
    updateLessonInfo(selectedCourseId, selectedLevelId, selectedLessonId); // Fetch and display lesson info
  } else {
    lessonInfoButton.classList.remove("active");
  }
}

// Function to show Course Info
async function showCourseInfo() {
  const selectedCourseId = document.getElementById("course").value;
  if (selectedCourseId) {
    document.querySelector(".right-column").style.display = "block";
    document.getElementById("courseInfo").style.display = "block";
    document.getElementById("levelInfo").style.display = "none";
    document.getElementById("lessonInfo").style.display = "none";
    updateCourseInfo(selectedCourseId); // Fetch and display course info
}
}

// Function to show Level Info
async function showLevelInfo() {
const selectedLevelId = document.getElementById("level").value;
if (selectedLevelId) {
  document.querySelector(".right-column").style.display = "block";
  document.getElementById("levelInfo").style.display = "block";
  document.getElementById("courseInfo").style.display = "none";
  document.getElementById("lessonInfo").style.display = "none";
  updateLevelInfo(selectedCourseId, selectedLevelId); // Fetch and display level info
}
}

// Function to show Lesson Info
async function showLessonInfo() {
const selectedCourseId = document.getElementById("course").value;
const selectedLevelId = document.getElementById("level").value;
const selectedLessonId = document.getElementById("lessonName").value;
if (selectedLessonId) {
  document.querySelector(".right-column").style.display = "block";
  document.getElementById("lessonInfo").style.display = "block";
  document.getElementById("courseInfo").style.display = "none";
  document.getElementById("levelInfo").style.display = "none";
  updateLessonInfo(selectedCourseId, selectedLevelId, selectedLessonId); // Fetch and display lesson info
}
}

// Event listeners for dropdown changes
document.getElementById("course").addEventListener("change", handleCourseChange);
document.getElementById("level").addEventListener("change", handleLevelChange);
document.getElementById("lessonName").addEventListener("change", handleLessonChange);

// Function to show/hide sections based on selected create type
document.getElementById("createType").addEventListener("change", function() {
var selectedValue = this.value;
var sections = document.querySelectorAll(".hidden");
sections.forEach(section => section.style.display = "none");
if (selectedValue === "concept") {
  document.getElementById("conceptSection").style.display = "block";
  showGenerateButton("conceptSection");
} else if (selectedValue === "project") {
  document.getElementById("projectSection").style.display = "block";
  showGenerateButton("projectSection");
} else if (selectedValue === "quiz") {
  document.getElementById("quizSection").style.display = "block";
  showGenerateButton("quizSection");
} else if (selectedValue === "activity") {
  document.getElementById("activitySection").style.display = "block";
  showGenerateButton("activitySection");
}
});

// Function to show/hide generate button
function showGenerateButton(sectionId) {
document.getElementById(sectionId).querySelector("button").style.display = "block";
}

