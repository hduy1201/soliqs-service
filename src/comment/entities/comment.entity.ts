import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import mongoose, { HydratedDocument } from 'mongoose';

export type CommentDocument = HydratedDocument<Comment>;

@Schema({ timestamps: true })
export class Comment {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  authorId: string;

  @Prop({ required: true })
  postId: string;

  @Prop({ required: true })
  authorName: string;

  @Prop({ required: true })
  authorAvatar: string;

  @Prop({ required: true })
  authorUserName: string;

  @Prop({ required: true })
  content: string;

  @Prop({ default: false })
  isDeleted: boolean;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
