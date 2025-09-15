import * as yup from 'yup';
import { RegisterInput, LoginInput, PostInput, UpdatePostInput } from '../types';

// Register validation schema
export const registerSchema: yup.ObjectSchema<RegisterInput> = yup.object({
  firstName: yup.string().required('First name is required').trim(),
  lastName: yup.string().required('Last name is required').trim(),
  email: yup.string().email('Invalid email format').required('Email is required').lowercase().trim(),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required')
});

// Login validation schema
export const loginSchema: yup.ObjectSchema<LoginInput> = yup.object({
  email: yup.string().email('Invalid email format').required('Email is required').lowercase().trim(),
  password: yup.string().required('Password is required')
});

// Post validation schema
export const postSchema: yup.ObjectSchema<PostInput> = yup.object({
  title: yup.string().required('Title is required').trim(),
  body: yup.string().required('Body is required')
});

// Update post validation schema
export const updatePostSchema: yup.ObjectSchema<UpdatePostInput> = yup.object({
  title: yup.string().trim(),
  body: yup.string()
}).test('at-least-one', 'At least one field (title or body) must be provided', function(value) {
  return value.title !== undefined || value.body !== undefined;
});