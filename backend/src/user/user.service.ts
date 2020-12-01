import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getOne(id: string): Promise<User> {
    try {
      const user = await this.userModel.findById(id).lean();
      if (user === null) {
        throw new NotFoundException(`Not Found UserId: ${id}`);
      } else return user;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  create(userData: CreateUserDto): Promise<User> {
    const createUser = new this.userModel(userData);
    Logger.log(createUser);
    return createUser.save();
  }

  async postLogin(userData: { email: string; password: string }) {
    try {
      const { email, password } = userData;
      const response = await this.userModel.findOne({ email });
      console.log('res: ', response);
      if (response === null) {
        throw new NotFoundException('not email');
      } else if (password !== response.password) {
        throw new NotFoundException('not password');
      } else {
        return response;
      }
    } catch (error) {
      Logger.log(`error:  ${error}`);
      throw new NotFoundException(error);
    }
  }

  async update(id: string, updateData: UpdateUserDto): Promise<boolean> {
    try {
      const response = await this.userModel.updateOne(
        {
          _id: Types.ObjectId(id),
        },
        {
          $set: updateData,
        },
      );
      console.log(
        'response.n ',
        response.n,
        'response.nModified',
        response.nModified,
      );
      if (response.n === 1 && response.nModified === 1) {
        return true;
      } else return false;
    } catch (error) {
      throw new InternalServerErrorException(`update Error: ${error}`);
    }
  }

  async deleteOne(id: string) {
    try {
      // const user = await this.getOne(id);
      await this.userModel.deleteOne({ _id: id });
    } catch (error) {
      throw new InternalServerErrorException(`deleteOne Error: ${error}`);
    }
  }
}
