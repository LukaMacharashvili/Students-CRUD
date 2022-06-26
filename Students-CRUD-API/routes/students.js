import express from "express";
import { getAllStudents, getStudentById, addStudent, deleteStudent, updateStudent } from "../controller/students.js";

const studentsRouter = express.Router();

studentsRouter.get('/', getAllStudents);

studentsRouter.get('/:id', getStudentById);

studentsRouter.post('/', addStudent);

studentsRouter.delete('/:id', deleteStudent);

studentsRouter.put('/:id', updateStudent);

export default studentsRouter