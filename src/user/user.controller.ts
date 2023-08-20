import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Headers,
  HttpException,
  InternalServerErrorException,
  NotFoundException,
  Put,
  ConflictException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from 'src/middlewares/auth/auth.service';
import { User } from './entities/user.entity';

@Controller('v1/user')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post()
  async create(@Headers() headers: any): Promise<User> {
    try {
      const authHeader = headers.authorization;
      const token = authHeader.replace('Bearer ', '');
      const decodedToken = await this.authService.verifyToken(token);
      const uid = decodedToken.uid;
      const existingUser = await this.userService.findOne(uid);
      if (existingUser) {
        throw new ConflictException('User already exists');
      }
      const user: User = {
        uid,
        email: decodedToken.email,
        name: decodedToken.name,
        picture: decodedToken.picture,
        profile: null,
      };
      const createdUser = await this.userService.create(user);
      return createdUser;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException('Failed to create user');
      }
    }
  }

  //chưa sử dụng
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    try {
      const user = await this.userService.findOne(id);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException('Failed to find user');
      }
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    try {
      const user = await this.userService.update(id, updateUserDto);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException('Failed to update user');
      }
    }
  }

  //chưa sử dụng
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
