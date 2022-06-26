import Student from '../models/student.model.js'

async function getAllStudentsS() {
    try {
        const studentes = await Student.find();
        return studentes;
    } catch (error) {
        throw error;
    }
};

async function getStudentByIdS(studentId) {
    try {
        const student = await Student.findById(studentId);
        return student;
    } catch (error) {
        throw error;
    }
};

async function addStudentS(studentData) {
    const student = new Student({ 
        name: studentData.name,
        surname: studentData.surname,
        email: studentData.email,
        image: studentData.image,
        universityName: studentData.universityName,
        gender: studentData.gender
    });
    try {
        const newStudent = await student.save();
        return newStudent;
    } catch (error) {
        throw error
    };
};

async function deleteStudentS(studentId) {
    try {
        const student = await Student.deleteOne({ _id: studentId });
        return student;
    } catch (error) {
        throw error;
    }
};

async function updateStudentS(studentId, studentData) {
    try {
        const student = await Student.findOneAndUpdate({studentId}, studentData);
        return student;
    } catch (error) {
        throw error;
    }
};

export { 
    getAllStudentsS,
    getStudentByIdS,
    deleteStudentS,
    addStudentS,
    updateStudentS  
}