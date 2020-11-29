import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// https://docs.nestjs.com/techniques/mongodb

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  serialNumber: number;
  @Prop()
  name: string;
  @Prop()
  email: string;
  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
