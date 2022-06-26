import Student from '../models/student.model.js';
import * as mockingoose from 'mockingoose';

import { 
    getAllStudentsS,
    getStudentByIdS,
    deleteStudentS,
    addStudentS,
    updateStudentS
} from '../services/students.js'
 
describe('Students Service', () => {
    describe('Add Student', () => {
        it('Should Return NewStudent + _id', async () => {
            const newStudent = {
                name: 'Luka',
                surname: 'Macharashvili',
                email: 'test@gmail.com',
                image: 'someImgUrl',
                universityName: 'UNI NAME',
                gender: 'Male'
            }
            mockingoose(Student).toReturn(newStudent, 'save')
            try {
                const received = await addStudentS(newStudent);
                expect(received).toHaveProperty('_id');
                expect(received).toHaveProperty('name', newStudent.name)
                expect(received).toHaveProperty('surname', newStudent.surname)
                expect(received).toHaveProperty('email', newStudent.email)
                expect(received).toHaveProperty('image', newStudent.image)
                expect(received).toHaveProperty('universityName', newStudent.universityName)
                expect(received).toHaveProperty('gender', newStudent.gender)
            } catch (error) {
                console.log(error)
            }
        });
        it('Should console.log(error) If Required Properties Are Not Provided!', async () => {
            const newStudent = {
                surname: 'Macharashvili',
                image: 'someImgUrl',
                universityName: 'UNI NAME',
                gender: 'Male'
            }
            mockingoose(Student).toReturn(newStudent, 'save');
            try {
                expect(await addStudentS(newStudent)).toThrow();
            } catch (error) {
                console.log(error)  
            }
        })
    });
    describe('Get All Students', () => {
        it('Should Return Students List With The Length Of 2', async () => {
            const studentList = [
                {
                    name: 'Luka',
                    surname: 'Macharashvili',
                    email: 'test@gmail.com',
                    image: 'someImgUrl',
                    universityName: 'UNI NAME',
                    gender: 'Male'
                },              
                {
                    name: 'Luka1',
                    surname: 'Macharashvili1',
                    email: 'test@gmail1.com',
                    image: 'someImgUrl1',
                    universityName: 'UNI NAME1',
                    gender: 'Male1'
                }
            ];
            mockingoose(Student).toReturn(studentList, 'find');
            try {
                const received = await getAllStudentsS();
                expect(received).toHaveLength(studentList.length)
            } catch (error) {
                console.log(error)
            }
        })
    });
    describe('Get One Student', () => {
        it('Should Return One Student With The Given Id', async () => {
            const studentData = {
                _id: '123',
                name: 'Luka',
                surname: 'Macharashvili',
                email: 'test@gmail.com',
                image: 'someImgUrl',
                universityName: 'UNI NAME',
                gender: 'Male'
            };
            mockingoose(Student).toReturn(studentData, 'findById');
            try {
                const received = await getStudentByIdS(studentData._id);
                expect(received).toBe(studentData);
            } catch (error) {
                console.log(error)  
            }
        })
        it('Should Throw An Error If Student With The Given Id Does Not Exists', async () => {
            mockingoose(Student).toReturn(undefined, 'findById');
            try {
                expect(await getStudentByIdS(123)
                .rejects())
                .toThrow();
            } catch (error) {
                console.log(error)
            }
        })
    })
    describe('Update Student', () => {
        it('Should Return Updated Student', async () => {
            const studentData = {
                    name: 'Luka',
                    surname: 'Macharashvili',
                    email: 'test@gmail.com',
                    image: 'someImgUrl',
                    universityName: 'UNI NAME',
                    gender: 'Male'
                };
            mockingoose(Student).toReturn(studentData, 'findOneAndUpdate');
            try {
                const received = await updateStudentS(123, studentData);
                expect(received).toHaveProperty('_id');
                expect(received).toHaveProperty('name', studentData.name);
                expect(received).toHaveProperty('surname', studentData.surname);
                expect(received).toHaveProperty('email', studentData.email);
                expect(received).toHaveProperty('image', studentData.image);
                expect(received).toHaveProperty('universityName', studentData.universityName);
                expect(received).toHaveProperty('gender', studentData.gender);
            } catch (error) {
                console.log(error);
            }
        })
        it('Should Throw An Error If Student With The Given Id Does Not Exists', async () => {
            const studentData = {
                name: 'Luka',
                surname: 'Macharashvili',
                email: 'test@gmail.com',
                image: 'someImgUrl',
                universityName: 'UNI NAME',
                gender: 'Male'
            };
            mockingoose(Student).toReturn(undefined, 'findById');
            try {
                expect(await updateStudentS(123, studentData)
                .rejects())
                .toThrow();
            } catch (error) {
                console.log(error)  
            }
        })
    })
    describe('Delete By Id', () => {
        it('Should Return Deleted Students Data', async () => {
            const studentData = {
                name: 'Luka',
                surname: 'Macharashvili',
                email: 'test@gmail.com',
                image: 'someImgUrl',
                universityName: 'UNI NAME',
                gender: 'Male'
            };
            mockingoose(Student).toReturn(studentData, 'deleteOne');
            try {
                const received = await deleteStudentS(123);
                expect(received).toBe(studentData);
            } catch (error) {
                console.log(error);
            }
        })
        it('Should Throw An Error If Student With The Given Id Does Not Exists', async () => {
            mockingoose(Student).toReturn(undefined, 'findById');
            try {
                expect(await deleteStudentS(123)
                .rejects())
                .toThrow();
            } catch (error) {
                console.log(error)  
            }
        })
    })
})