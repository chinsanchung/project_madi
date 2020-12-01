import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('api/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Get(':id')
  async getOne(@Param('id') userId: string) {
    // @Req() req, @Res() res 이지만 nest 는 비권장
    // console.log(userId);
    const response = await this.userService.getOne(userId);
    return response;
  }
  @Post('login')
  async postLogin(@Body() loginData: { email: string; password: string }) {
    const response = await this.userService.postLogin(loginData);
    const accessToken = this.jwtService.sign(
      { id: response._id, email: response.email },
      { expiresIn: '1h' },
    );
    const refreshToken = this.jwtService.sign(
      { id: response._id, email: response.email },
      { expiresIn: '7d' },
    );
    console.log('token? ', accessToken);
    return response;
  }

  @Post('join')
  async postJoin(@Body() userData: CreateUserDto) {
    await this.userService.create(userData);
  }

  @Delete(':id')
  async delete(@Param('id') userId: string) {
    await this.userService.deleteOne(userId);
  }

  @Patch(':id')
  async patch(@Param('id') userId: string, @Body() updateData: UpdateUserDto) {
    return await this.userService.update(userId, updateData);
  }
}
