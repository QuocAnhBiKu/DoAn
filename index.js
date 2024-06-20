// Endpoint API
const APIMain = "http://localhost:3000/api"
const coursesEndpoint = `${APIMain}/courses`;
const levelsEndpoint = `${APIMain}/levels/`;
const lessonsEndpoint = `${APIMain}/lessons/`;

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
    const response = await fetch(`${levelsEndpoint}?courseId=${courseId}`);
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
    const response = await fetch(`${lessonsEndpoint}?courseId=${courseId}&levelId=${levelId}`);
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
    const response = await fetch(`${coursesEndpoint}/find?courseId=${courseId}`);
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
    const response = await fetch(`${levelsEndpoint}/find?courseId=${courseId}&levelId=${levelId}`);
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
    const response = await fetch(`${lessonsEndpoint}/findbyid?courseId=${courseId}&levelId=${levelId}&lessonId=${lessonId}`);
    const lessonInfo = await response.json();
    return lessonInfo;
  } catch (error) {
    console.error("Error fetching lesson info:", error);
    return null;
  }
}

// Function to fetch all necessary data for a given courseId, levelId, lessonId
async function fetchData(courseId, levelId, lessonId) {
  try {
    const [courseInfo, levels, lessons, levelInfo, lessonInfo] = await Promise.all([
      fetchCourseInfo(courseId),
      fetchLevels(courseId),
      fetchLessons(courseId, levelId),
      fetchLevelInfo(courseId, levelId),
      fetchLessonInfo(courseId, levelId, lessonId)
    ]);

    return {
      courseInfo,
      levels,
      lessons,
      levelInfo,
      lessonInfo
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

// Function to update course info
async function updateCourseInfo(courseId) {
  try {
    const courseInfo = await fetchCourseInfo(courseId);
    if (courseInfo) {
      const courseInfoContainer = document.getElementById("courseInfoContainer");
      courseInfoContainer.innerHTML = `
        <h2>${checkValue(courseInfo.courseName)}</h2>
        <p><strong>Course Description:</strong> ${checkValue(courseInfo.courseDescription)}</p>
        <p><strong>Course Tools:</strong></p>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Version</th>
                <th>Types</th>
              </tr>
            </thead>
            <tbody>
              ${courseInfo.courseTools.map(tool => `
                <tr>
                  <td>${checkValue(tool.toolName)}</td>
                  <td>${checkValue(tool.toolDescription)}</td>
                  <td>${checkValue(tool.toolVersion)}</td>
                  <td>${checkValue(tool.toolTypes)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        <p><strong>Course Levels:</strong></p>
        <ul>${courseInfo.courseLevels.map(level => `<li>${checkValue(level)}</li>`).join('')}</ul>
      `;
    } else {
      console.error("Failed to update course info: courseInfo is null or undefined");
    }
  } catch (error) {
    console.error("Failed to update course info:", error);
  }
}

// Function to update level info
async function updateLevelInfo(courseId, levelId) {
  try {
    const levelInfo = await fetchLevelInfo(courseId, levelId);
    if (levelInfo) {
      const levelInfoContainer = document.getElementById("levelInfoContainer");
      levelInfoContainer.innerHTML = `
        <h2>${checkValue(levelInfo.levelName)}</h2>
        <p><strong>Level Description:</strong> ${checkValue(levelInfo.levelDescription)}</p>
        <p><strong>Level Tools:</strong></p>
        <ul>${levelInfo.levelTools.map(tool => `<li>${checkValue(tool.toolName)}</li>`).join('')}</ul>
        <p><strong>Level Lessons:</strong></p>
        <ul>${levelInfo.levelLessons.map(lesson => `<li>${checkValue(lesson)}</li>`).join('')}</ul>
      `;
    } else {
      console.error("Failed to update level info: levelInfo is null or undefined");
    }
  } catch (error) {
    console.error("Failed to update level info:", error);
  }
}

// Function to update lesson info
async function updateLessonInfo(courseId, levelId, lessonId) {
  try {
    const lessonInfo = await fetchLessonInfo(courseId, levelId, lessonId);
    if (lessonInfo) {
      const lessonInfoContainer = document.getElementById("lessonInfoContainer");

      lessonInfoContainer.innerHTML = `
        <h2>${checkValue(lessonInfo.lessonName)}</h2>
        <p><strong>Lesson Number:</strong> ${checkValue(lessonInfo.lessonNumber)}</p>
        <p><strong>Lesson Image:</strong></p>
        <p><a href="${checkValue(lessonInfo.lessonImage)}" target="_blank" style="color: black;">${checkValue(lessonInfo.lessonImage)}</a></p>
        <p><strong>Lesson Topic:</strong> ${checkValue(lessonInfo.lessonTopic)}</p>
        <p><strong>Lesson Goal:</strong> ${checkValue(lessonInfo.lessonGoal)}</p>
        <p><strong>Lesson Tools:</strong></p>
        <ul>${lessonInfo.tools.map(tool => `<li>${checkValue(tool.toolName)}</li>`).join('')}</ul>
        <p><strong>Concepts:</strong></p>
        <ul>
          <li><strong>Computer Science:</strong> ${lessonInfo.lessonConcepts.conceptComputerScience.map(checkValue).join(', ')}</li>
          <li><strong>Science:</strong> ${lessonInfo.lessonConcepts.conceptScience.map(checkValue).join(', ')}</li>
          <li><strong>Tech:</strong> ${lessonInfo.lessonConcepts.conceptTech.map(checkValue).join(', ')}</li>
          <li><strong>Engineering:</strong> ${lessonInfo.lessonConcepts.conceptEngineering.map(checkValue).join(', ')}</li>
          <li><strong>Art:</strong> ${lessonInfo.lessonConcepts.conceptArt.map(checkValue).join(', ')}</li>
          <li><strong>Math:</strong> ${lessonInfo.lessonConcepts.conceptMath.map(checkValue).join(', ')}</li>
          <li><strong>Skill:</strong> ${lessonInfo.lessonConcepts.conceptSkill.map(checkValue).join(', ')}</li>
        </ul>
        <p><strong>Materials:</strong></p>
        <ul>
          <li><strong>Lesson Plan:</strong> <a href="${checkValue(lessonInfo.materials.lessonPlan?.materialLink)}" target="_blank" style="color: black;">${checkValue(lessonInfo.materials.lessonPlan?.materialName)}</a></li>
          <li><strong>Slide:</strong> <a href="${checkValue(lessonInfo.materials.slide?.materialLink)}" target="_blank" style="color: black;">${checkValue(lessonInfo.materials.slide?.materialName)}</a></li>
          <li><strong>Summary:</strong> <a href="${checkValue(lessonInfo.materials.summary?.materialLink)}" target="_blank" style="color: black;">${checkValue(lessonInfo.materials.summary?.materialName)}</a></li>
          <li><strong>Quiz:</strong> <a href="${checkValue(lessonInfo.materials.quiz?.materialLink)}" target="_blank" style="color: black;">${checkValue(lessonInfo.materials.quiz?.materialName)}</a></li>
          <li><strong>Video:</strong> <a href="${checkValue(lessonInfo.materials.video?.materialLink)}" target="_blank" style="color: black;">${checkValue(lessonInfo.materials.video?.materialName)}</a></li>
        </ul>
        <p><strong>Project:</strong></p>
        <ul>
          <li><strong>Project Name:</strong> ${checkValue(lessonInfo.project.projectName)}</li>
          <li><strong>Project Description:</strong> ${checkValue(lessonInfo.project.projectDescription)}</li>
          <li><strong>Project Related Concepts:</strong> ${lessonInfo.project.projectRelatedConcepts.map(checkValue).join(', ')}</li>
          <li><strong>Project Tools:</strong> ${lessonInfo.project.projectTools.map(checkValue).join(', ')}</li>
          <li><strong>Project Instruction:</strong> <a href="${checkValue(lessonInfo.project.projectInstruction)}" target="_blank" style="color: black;">${checkValue(lessonInfo.project.projectInstruction)}</a></li>
        </ul>
      `;
    } else {
      console.error("Failed to update lesson info: lessonInfo is null or undefined");
    }
  } catch (error) {
    console.error("Failed to update lesson info:", error);
  }
}

let isLoadingCourses = false;
let isLoadingLevels = false;
let isLoadingLessons = false;

// Function to populate course dropdown
async function populateCourses() {
  try {
    isLoadingCourses = true;
    const courseSelect = document.getElementById("course");
    courseSelect.disabled = true;
    courseSelect.innerHTML = '<option value="" disabled selected>Loading...</option>';

    const courses = await fetchCourses();
    courseSelect.innerHTML = '<option value="" disabled selected>Select Course</option>';
    courses.forEach(course => {
      const option = document.createElement("option");
      option.value = course.courseId;
      option.text = course.courseName;
      courseSelect.add(option);
    });

    isLoadingCourses = false;
    courseSelect.disabled = false;
  } catch (error) {
    console.error("Error populating courses:", error);
    isLoadingCourses = false;
  }
}

// Function to populate level dropdown
async function populateLevels(courseId) {
  try {
    isLoadingLevels = true;
    const levelSelect = document.getElementById("level");
    levelSelect.disabled = true;
    levelSelect.innerHTML = '<option value="" disabled selected>Loading...</option>';

    const levels = await fetchLevels(courseId);
    levelSelect.innerHTML = '<option value="" disabled selected>Select Level</option>';
    levels.forEach(level => {
      const option = document.createElement("option");
      option.value = level.levelId;
      option.text = level.levelName;
      levelSelect.add(option);
    });

    isLoadingLevels = false;
    levelSelect.disabled = false;
  } catch (error) {
    console.error("Error populating levels:", error);
    isLoadingLevels = false;
  }
}

// Function to populate lesson dropdown
async function populateLessons(courseId, levelId) {
  try {
    isLoadingLessons = true;
    const lessonSelect = document.getElementById("lessonName");
    lessonSelect.disabled = true;
    lessonSelect.innerHTML = '<option value="" disabled selected>Loading...</option>';

    const lessons = await fetchLessons(courseId, levelId);
    lessonSelect.innerHTML = '<option value="" disabled selected>Select Lesson</option>';
    lessons.forEach(lesson => {
      const option = document.createElement("option");
      option.value = lesson.lessonId;
      option.text = lesson.lessonName;
      lessonSelect.add(option);
    });

    isLoadingLessons = false;
    lessonSelect.disabled = false;
  } catch (error) {
    console.error("Error populating lessons:", error);
    isLoadingLessons = false;
  }
}

// Function to handle Course change
async function handleCourseChange() {
  const selectedCourseId = document.getElementById("course").value;
  const levelSelect = document.getElementById("level");
  const lessonSelect = document.getElementById("lessonName");
  const levelInfoButton = document.getElementById("levelInfoButton");
  const lessonInfoButton = document.getElementById("lessonInfoButton");

  // Reset level and lesson selection and buttons
  levelSelect.disabled = true;
  lessonSelect.disabled = true;
  levelSelect.innerHTML = '<option value="" disabled selected>Select Level</option>';
  lessonSelect.innerHTML = '<option value="" disabled selected>Select Lesson</option>';
  levelInfoButton.classList.remove("active");
  lessonInfoButton.classList.remove("active");

  if (selectedCourseId && !isLoadingCourses) {
    levelSelect.disabled = false;
    await populateLevels(selectedCourseId);
    courseInfoButton.classList.add("active");
  } else {
    courseInfoButton.classList.remove("active");
  }

  // Prevent reset on blur
  document.getElementById("course").blur();
}

// Function to handle Level change
async function handleLevelChange() {
  const selectedCourseId = document.getElementById("course").value;
  const selectedLevelId = document.getElementById("level").value;
  const lessonSelect = document.getElementById("lessonName");
  const lessonInfoButton = document.getElementById("lessonInfoButton");

  // Reset lesson selection and button
  lessonSelect.disabled = true;
  lessonSelect.innerHTML = '<option value="" disabled selected>Select Lesson</option>';
  lessonInfoButton.classList.remove("active");

  if (selectedLevelId && !isLoadingLevels) {
    lessonSelect.disabled = false;
    await populateLessons(selectedCourseId, selectedLevelId);
    levelInfoButton.classList.add("active");
  } else {
    levelInfoButton.classList.remove("active");
  }

  // Prevent reset on blur
  document.getElementById("level").blur();
}

// Function to handle Lesson change
async function handleLessonChange() {
  const selectedLessonId = document.getElementById("lessonName").value;
  const lessonInfoButton = document.getElementById("lessonInfoButton");

  if (selectedLessonId) {
    lessonInfoButton.classList.add("active");
  } else {
    lessonInfoButton.classList.remove("active");
  }

  // Prevent reset on blur
  document.getElementById("lessonName").blur();
}

// Event listeners for dropdown changes
document.getElementById("course").addEventListener("change", handleCourseChange);
document.getElementById("level").addEventListener("change", handleLevelChange);
document.getElementById("lessonName").addEventListener("change", handleLessonChange);

// Helper function to check for empty, placeholder strings, or undefined values
function checkValue(value) {
  if (value === "" || value === "--- o ---" || value === undefined || value === null) {
    return "Not Available";
  }
  return value;
}

// Event listener for Course Info button
document.getElementById("courseInfoButton").addEventListener("click", async () => {
  const selectedCourseId = document.getElementById("course").value;
  if (selectedCourseId) {
    await updateCourseInfo(selectedCourseId);
  }
});

// Event listener for Level Info button
document.getElementById("levelInfoButton").addEventListener("click", async () => {
  const selectedCourseId = document.getElementById("course").value;
  const selectedLevelId = document.getElementById("level").value;
  if (selectedCourseId && selectedLevelId) {
    await updateLevelInfo(selectedCourseId, selectedLevelId);
  }
});

// Event listener for Lesson Info button
document.getElementById("lessonInfoButton").addEventListener("click", async () => {
  const selectedCourseId = document.getElementById("course").value;
  const selectedLevelId = document.getElementById("level").value;
  const selectedLessonId = document.getElementById("lessonName").value;
  if (selectedCourseId && selectedLevelId && selectedLessonId) {
    await updateLessonInfo(selectedCourseId, selectedLevelId, selectedLessonId);
  }
});

// Call populateCourses on page load
window.onload = () => {
  populateCourses();
};

// Function to show Course Info
async function showCourseInfo() {
  const selectedCourseId = document.getElementById("course").value;
  if (selectedCourseId) {
    document.querySelector(".right-column").style.display = "block";
    document.getElementById("courseInfo").style.display = "block";
    document.getElementById("levelInfo").style.display = "none";
    document.getElementById("lessonInfo").style.display = "none";

    const courseInfoContainer = document.getElementById("courseInfoContainer");
    courseInfoContainer.innerHTML = ""; // Xóa nội dung cũ

    await updateCourseInfo(selectedCourseId); // Fetch and display course info
  }
}

// Function to show Level Info
async function showLevelInfo() {
  const selectedCourseId = document.getElementById("course").value;
  const selectedLevelId = document.getElementById("level").value;
  if (selectedLevelId) {
    document.querySelector(".right-column").style.display = "block";
    document.getElementById("levelInfo").style.display = "block";
    document.getElementById("courseInfo").style.display = "none";
    document.getElementById("lessonInfo").style.display = "none";

    const levelInfoContainer = document.getElementById("levelInfoContainer");
    levelInfoContainer.innerHTML = ""; // Xóa nội dung cũ

    await updateLevelInfo(selectedCourseId, selectedLevelId); // Fetch and display level info
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

    const lessonInfoContainer = document.getElementById("lessonInfoContainer");
    lessonInfoContainer.innerHTML = ""; // Xóa nội dung cũ

    await updateLessonInfo(selectedCourseId, selectedLevelId, selectedLessonId); // Fetch and display lesson info
  }
}

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