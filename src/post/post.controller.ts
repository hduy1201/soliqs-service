import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('v1/post')
export class PostController {
  constructor(private postService: PostService) {}

  @Post()
  async create(@Body() createPostDto: CreatePostDto) {
    const requiredFields = [
      'id',
      'authorId',
      'authorName',
      'authorAvatar',
      'authorUserName',
      'content',
    ];
    const missingFields = requiredFields.filter(
      (field) => !createPostDto[field],
    );
    if (missingFields.length > 0) {
      throw new HttpException(
        `Missing required fields: ${missingFields.join(', ')}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      const newPost = await this.postService.create(createPostDto);
      return newPost;
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const post = await this.postService.findOne(id);
      return post;
    } catch (error) {
      throw error;
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    try {
      const updatedPost = await this.postService.update(id, updatePostDto);
      return updatedPost;
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const deletedPost = await this.postService.remove(id);
      return deletedPost;
    } catch (error) {
      throw error;
    }
  }

  @Get('author/:authorId')
  async findByAuthorId(@Param('authorId') authorId: string) {
    try {
      const posts = await this.postService.findByAuthorId(authorId);
      return posts;
    } catch (error) {
      throw error;
    }
  }

  @Get('tags/:tags')
  async findByTags(@Param('tags') tags: string[]) {
    try {
      const posts = await this.postService.findByTags(tags);
      return posts;
    } catch (error) {
      throw error;
    }
  }

  @Get('all')
  async findAllAndSort() {
    try {
      const posts = await this.postService.findAllAndSort();
      return posts;
    } catch (error) {
      throw error;
    }
  }

  @Put(':id/like')
  async likePost(
    @Param('id') id: string,
    @Body('profileId') profileId: string,
  ) {
    try {
      const updatedPost = await this.postService.like(id, profileId);
      return updatedPost;
    } catch (error) {
      throw error;
    }
  }

  @Put(':id/unlike')
  async unlikePost(
    @Param('id') id: string,
    @Body('profileId') profileId: string,
  ) {
    try {
      const updatedPost = await this.postService.unlike(id, profileId);
      return updatedPost;
    } catch (error) {
      throw error;
    }
  }
}
