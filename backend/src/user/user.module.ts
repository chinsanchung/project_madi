import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { UserService } from './user.service';
import { UserController } from './user.controller';
// import mongoose from 'mongoose';
// const AutoIncrement = require('mongoose-sequence')(mongoose);

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}

// imports: [
//   MongooseModule.forFeatureAsync([
//     {
//       name: 'User',
//       useFactory: async () => {
//         const schema = UserSchema;

//         schema.plugin(AutoIncrement, { inc_field: 'serialNumber' });
//         return schema;
//       },
//     },
//   ]),
// ],
