import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './entities/post.entity';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    try {
      const post = new this.postModel(createPostDto);
      return await post.save();
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(id: string) {
    try {
      const post = await this.postModel.findOne({ id: id });
      return post;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    try {
      const updatedPost = await this.postModel.findOneAndUpdate(
        { id: id },
        { ...updatePostDto },
        { new: true },
      );
      return updatedPost;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async remove(id: string) {
    try {
      const deletePost = await this.postModel.findOneAndDelete({ id: id });
      return deletePost;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findByAuthorId(authorId: string) {
    try {
      const posts = await this.postModel.find({ authorId: authorId }).exec();
      return posts;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findByTags(tags: string[]) {
    try {
      const posts = await this.postModel.find({ tags: { $in: tags } }).exec();
      return posts;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findAllAndSort() {
    try {
      const posts = await this.postModel.find().sort({ createdAt: -1 }).exec();
      return posts;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async like(id: string, profileId: string): Promise<Post> {
    try {
      const post = await this.postModel.findOneAndUpdate(
        { id: id },
        {
          $addToSet: { likes: profileId },
        },
        { new: true },
      );

      if (!post) {
        throw new NotFoundException('Post not found');
      }

      return post;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async unlike(id: string, profileId: string): Promise<Post> {
    try {
      const post = await this.postModel.findOneAndUpdate(
        { id: id },
        {
          $pull: { likes: profileId },
        },
        { new: true },
      );

      if (!post) {
        throw new NotFoundException('Post not found');
      }

      return post;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
