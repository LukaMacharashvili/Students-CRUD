import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StudentDocument = Student & Document;

@Schema()
export class Student {
  @Prop({ required: true })
  name: string;

  @Prop()
  surname: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  image: string;

  @Prop()
  gender: string;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
