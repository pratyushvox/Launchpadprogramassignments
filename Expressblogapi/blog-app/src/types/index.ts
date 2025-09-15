import { Document, ObjectId,Types } from 'mongoose';
import { Request } from 'express';

export interface IUser extends Document {
 
 _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'blogger' | 'admin';
  comparePassword(candidatePassword: string): Promise<boolean>;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPost extends Document {
  title: string;
  body: string;
  author: ObjectId;
  createdBy: ObjectId;
  updatedBy: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthRequest extends Request {
  user?: IUser;
}

export interface RegisterInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface PostInput {
  title: string;
  body: string;
}

export interface UpdatePostInput {
  title?: string;
  body?: string;
}