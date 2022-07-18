import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Student, StudentSchema } from 'src/schema/student.schema';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }]),
    MongooseModule.forFeatureAsync([
      {
        name: Student.name,
        useFactory: () => {
          const schema = StudentSchema;
          schema.pre<Student>('save', async function () {
            const Student = this;
            const image = (
              await CloudinaryService.convertImageToCloudinary(Student.image)
            ).url;
            Student.image = image;
          });
          return schema;
        },
      },
    ]),
  ],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}
