import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student, StudentDocument } from 'src/schema/student.schema';
import { CreateStudentDto, UpdateStudentDto } from './dto/student.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Student.name) private StudentModel: Model<StudentDocument>,
  ) {}
  async getAllStudents(): Promise<Student[]> {
    return this.StudentModel.find().exec();
  }

  async getStudentById(studentId: string): Promise<Student> {
    return this.StudentModel.findById(studentId).exec();
  }

  async addNewStudent(createStudentDto: CreateStudentDto): Promise<Student> {
    const student = new this.StudentModel(createStudentDto);
    return student.save();
  }

  async deleteStudent(studentId: string): Promise<any> {
    return this.StudentModel.findByIdAndDelete(studentId).exec();
  }

  async updateStudent(
    studentId: string,
    updateStudentDto: UpdateStudentDto,
  ): Promise<Student> {
    const student = await this.StudentModel.findById(studentId);
    student.name = updateStudentDto.name;
    student.surname = updateStudentDto.surname;
    student.email = updateStudentDto.email;
    student.image = updateStudentDto.image;
    student.gender = updateStudentDto.gender;
    return student.save();
  }
}
