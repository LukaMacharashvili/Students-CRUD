import { 
    getAllStudentsS,
    getStudentByIdS,
    deleteStudentS,
    addStudentS,
    updateStudentS
} from '../services/students.js'

async function getAllStudents(req, res) {
    try {
        const studentes = await getAllStudentsS();
        res.status(200).json(studentes)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

async function getStudentById(req, res) {
    try {
        const student = await getStudentByIdS(req.params.id);
        return res.status(200).json(student)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
};

async function addStudent(req, res) {
    try {
        const newStudent = await addStudentS(req.body);
        return res.status(200).json(newStudent);
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
};

async function deleteStudent(req, res) {
    try {
        const student = await deleteStudentS(req.params.id);
        return res.status(200).json(student)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
};

async function updateStudent(req, res) {
    try {
        const student = await updateStudentS(req.params.id, req.body);
        return res.status(200).json(student)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
};

export { 
    getAllStudents,
    getStudentById,
    deleteStudent,
    addStudent,
    updateStudent
}