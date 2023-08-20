import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name) private profileModel: Model<Profile>,
  ) {}

  async create(createProfileDto: CreateProfileDto): Promise<Profile> {
    try {
      const profile = new this.profileModel(createProfileDto);
      return await profile.save();
    } catch (error) {
      // if (error instanceof HttpException) {
      //   throw error;
      // } else {
      //   throw new InternalServerErrorException('Failed to create profile');
      // }
      console.log(error);
    }
  }

  findAll() {
    return `This action returns all profile`;
  }

  async findOne(id: string): Promise<Profile> {
    try {
      const profile = await this.profileModel.findById(id);
      if (!profile) {
        throw new NotFoundException('Profile not found');
      }
      return profile;
    } catch (error) {
      return error;
    }
  }

  update(id: string, updateProfileDto: UpdateProfileDto) {
    return `This action updates a #${id} profile`;
  }

  remove(id: String) {
    return `This action removes a #${id} profile`;
  }
}
