import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ProfileDocument = HydratedDocument<Profile>;

@Schema({ timestamps: true })
export class Profile {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true, unique: true })
  userName: string;

  @Prop()
  displayName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  phone: string;

  @Prop()
  country: string;

  @Prop()
  avatar: string;

  @Prop()
  cover: string;

  @Prop()
  bio: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Profile', default: null })
  followers: string[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Profile', default: null })
  following: string[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Post', default: null })
  posts: string[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Post', default: null })
  saved: string[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Tag', default: null })
  tag: string[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Profile', default: null })
  blocked: string[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Group', default: null })
  groups: string[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Group', default: null })
  notifications: string[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message',
    default: null,
  })
  messages: string[];
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
