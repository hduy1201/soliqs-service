import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import mongoose, { HydratedDocument } from 'mongoose';

export type PostDocument = HydratedDocument<Post>;

@Schema({ timestamps: true })
export class Post {
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

  @Prop({ default: null })
  media: string[];

  @Prop({ default: null })
  tags: string[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Profile' })
  likes: string[];

  @Prop({ default: null })
  comments: string[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Profile' })
  shares: string[];

  @Prop({ default: null })
  bookmarks: string[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
