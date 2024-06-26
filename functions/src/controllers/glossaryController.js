const glossaryService = require("../service/glossaryService");

async function getGlossaryForLesson(req, res) {
  const glossary = glossaryService.getGlossary();
  if (glossary) {
    res.json(glossary);
  } else {
    res.status(404).json({ message: "No lesson found" });
  }
}

module.exports = {
  getGlossaryForLesson,
};
