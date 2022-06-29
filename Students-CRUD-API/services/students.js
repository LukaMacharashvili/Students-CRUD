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
        const student = await Student.findById(studentId);

        student.name = studentData.name || student.name;
        student.surname = studentData.surname || student.surname;
        student.email = studentData.email || student.email;
        student.image = studentData.image || student.image;
        student.gender = studentData.gender || student.gender;

        await student.save();
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
