const Note = require("../models/Note");

// ✅ CREATE NOTE
exports.createNote = async (req, res) => {
  try {
    const { title, category } = req.body;

    if (!title || !category) {
      return res.status(400).json({ message: "Title & Category required" });
    }

    const note = await Note.create({ title, category });

    res.status(201).json({
      message: "Note created",
      note
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ NOTES PER CATEGORY
exports.notesPerCategory = async (req, res) => {
  try {
    const result = await Note.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $project: { category: "$_id", count: 1, _id: 0 } }
    ]);

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ NOTES PER MONTH
exports.notesPerMonth = async (req, res) => {
  try {
    const result = await Note.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          total: { $sum: 1 }
        }
      },
      {
        $project: {
          month: "$_id",
          total: 1,
          _id: 0
        }
      }
    ]);

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};