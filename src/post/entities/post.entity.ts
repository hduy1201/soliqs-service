import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import mongoose, { HydratedDocument } from 'mongoose';

export type PostsDocument = HydratedDocument<Posts>;

@Schema({ timestamps: true })
export class Posts {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  authorId: string;

  @Prop({ required: true })
  authorName: string;

  @Prop({ required: true })
  authorAvatar: string;

  @Prop({ required: true })
  authorUserName: string;

  @Prop({ required: true })
  content: string;

  @Prop({ default: [] })
  media: string[];

  @Prop({ default: [] })
  tags: string[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Profile', default: [] })
  likes: string[];

  @Prop({ default: [] })
  comments: string[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Profile', default: [] })
  shares: string[];

  @Prop({ default: [] })
  bookmarks: string[];

  @Prop({ default: false })
  isPrivate: boolean;
}

export const PostsSchema = SchemaFactory.createForClass(Posts);
