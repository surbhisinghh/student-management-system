const express = require("express");
const students = require("../data/students");

const router = express.Router();

// Helper: validate an id coming from the URL
const parseId = (rawId) => {
  const id = Number(rawId);
  if (!Number.isInteger(id) || id <= 0) return null;
  return id;
};

// Helper: validate the student body
const validateBody = (body) => {
  if (!body || Object.keys(body).length === 0) {
    return "Request body is missing";
  }

  const { name, age, course, email } = body;

  if (!name || !age || !course || !email) {
    return "Name, age, course and email are required";
  }
  if (typeof name !== "string" || name.trim() === "") {
    return "Name must be a valid text value";
  }
  if (typeof course !== "string" || course.trim() === "") {
    return "Course must be a valid text value";
  }
  if (isNaN(Number(age)) || Number(age) <= 0) {
    return "Age must be a positive number";
  }
  if (typeof email !== "string" || !email.includes("@")) {
    return "Email must be a valid email address";
  }
  return null;
};

// GET /students -> all students
router.get("/students", (req, res) => {
  res.status(200).json({ success: true, data: students });
});

// GET /students/:id -> single student
router.get("/students/:id", (req, res) => {
  const id = parseId(req.params.id);
  if (id === null) {
    return res.status(400).json({ success: false, message: "Invalid student id" });
  }

  const student = students.find((s) => s.id === id);
  if (!student) {
    return res.status(404).json({ success: false, message: "Student not found" });
  }

  res.status(200).json({ success: true, data: student });
});

// POST /students -> create a student
router.post("/students", (req, res) => {
  const error = validateBody(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error });
  }

  const { name, age, course, email } = req.body;

  const newStudent = {
    id: students.length > 0 ? Math.max(...students.map((s) => s.id)) + 1 : 1,
    name: name.trim(),
    age: Number(age),
    course: course.trim(),
    email: email.trim(),
  };

  students.push(newStudent);

  res.status(201).json({
    success: true,
    message: "Student created successfully",
    data: newStudent,
  });
});

// PUT /students/:id -> update a student
router.put("/students/:id", (req, res) => {
  const id = parseId(req.params.id);
  if (id === null) {
    return res.status(400).json({ success: false, message: "Invalid student id" });
  }

  const index = students.findIndex((s) => s.id === id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: "Student not found" });
  }

  const error = validateBody(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error });
  }

  const { name, age, course, email } = req.body;

  students[index] = {
    id,
    name: name.trim(),
    age: Number(age),
    course: course.trim(),
    email: email.trim(),
  };

  res.status(200).json({
    success: true,
    message: "Student updated successfully",
    data: students[index],
  });
});

// DELETE /students/:id -> delete a student
router.delete("/students/:id", (req, res) => {
  const id = parseId(req.params.id);
  if (id === null) {
    return res.status(400).json({ success: false, message: "Invalid student id" });
  }

  const index = students.findIndex((s) => s.id === id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: "Student not found" });
  }

  const deleted = students.splice(index, 1)[0];

  res.status(200).json({
    success: true,
    message: "Student deleted successfully",
    data: deleted,
  });
});

module.exports = router;
