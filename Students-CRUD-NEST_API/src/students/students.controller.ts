import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateStudentDto, UpdateStudentDto } from './dto/student.dto';
import { StudentsService } from './students.service';

@Controller('students')
export class StudentsController {
  constructor(private studentsService: StudentsService) {}
  @Get()
  getAllStudents() {
    return this.studentsService.getAllStudents();
  }

  @Get('/:studentId')
  getStudentById(@Param('studentId') studentId: string) {
    return this.studentsService.getStudentById(studentId);
  }

  @Post()
  addNewStudent(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.addNewStudent(createStudentDto);
  }

  @Delete('/:studentId')
  deleteStudent(@Param('studentId') studentId: string) {
    return this.studentsService.deleteStudent(studentId);
  }

  @Put('/:studentId')
  updateStudent(
    @Param('studentId') studentId: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    return this.studentsService.updateStudent(studentId, updateStudentDto);
  }
}
