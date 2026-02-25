const express = require("express");
const {
  notesPerCategory,
  notesPerMonth,
  createNote
} = require("../controllers/analyticsController");

const router = express.Router();

router.post("/create", createNote);
router.get("/category", notesPerCategory);
router.get("/month", notesPerMonth);

module.exports = router;