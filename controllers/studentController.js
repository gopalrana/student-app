const Student = require('../models/student');

exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).send('Student not found');
    res.json(student);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.createStudent = async (req, res) => {
  const newStudent = new Student(req.body);
  try {
    const student = await newStudent.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!student) return res.status(404).send('Student not found');
    res.json(student);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).send('Student not found');
    res.send('Student deleted');
  } catch (err) {
    res.status(500).send(err.message);
  }
};
