import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail } from 'class-validator';
import mongoose, { HydratedDocument } from 'mongoose';

export type ProfileDocument = HydratedDocument<Profile>;

@Schema({ timestamps: true })
export class Profile {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true, unique: true })
  userName: string;

  @Prop({ default: null })
  displayName: string;

  @IsEmail()
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ default: null })
  phone: string;

  @Prop({ default: null })
  country: string;

  @Prop({ default: null })
  avatar: string;

  @Prop({ default: null })
  cover: string;

  @Prop({ default: null })
  bio: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Profile', default: [] })
  followers: string[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Profile', default: [] })
  following: string[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Tag', default: [] })
  tags: string[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Profile', default: [] })
  blocked: string[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Notification',
    default: [],
  })
  notifications: string[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message',
    default: [],
  })
  messages: string[];
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
