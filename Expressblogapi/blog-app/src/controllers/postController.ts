import { Response } from 'express';
import Post from '../models/Post';
import { AuthRequest, PostInput, UpdatePostInput } from '../types';

// Create a new post
export const createPost = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { title, body } = req.body as PostInput;

    const post = await Post.create({
      title,
      body,
      author: req.user!._id,
      createdBy: req.user!._id,
      updatedBy: req.user!._id
    });

    // Populate author details
    await post.populate('author', 'firstName lastName email');

    res.status(201).json({
      message: 'Post created successfully',
      post
    });
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all posts
export const getPosts = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    let posts;
    
    if (req.user!.role === 'admin') {
      // Admin can see all posts
      posts = await Post.find()
        .populate('author', 'firstName lastName email')
        .populate('createdBy', 'firstName lastName email')
        .populate('updatedBy', 'firstName lastName email')
        .sort({ createdAt: -1 });
    } else {
      // Blogger can only see their own posts
      posts = await Post.find({ author: req.user!._id })
        .populate('author', 'firstName lastName email')
        .populate('createdBy', 'firstName lastName email')
        .populate('updatedBy', 'firstName lastName email')
        .sort({ createdAt: -1 });
    }

    res.json({
      message: 'Posts retrieved successfully',
      posts,
      count: posts.length
    });
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get single post
export const getPost = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { postId } = req.params;
    let post;

    if (req.user!.role === 'admin') {
      // Admin can see any post
      post = await Post.findById(postId)
        .populate('author', 'firstName lastName email')
        .populate('createdBy', 'firstName lastName email')
        .populate('updatedBy', 'firstName lastName email');
    } else {
      // Blogger can only see their own post
      post = await Post.findOne({ _id: postId, author: req.user!._id })
        .populate('author', 'firstName lastName email')
        .populate('createdBy', 'firstName lastName email')
        .populate('updatedBy', 'firstName lastName email');
    }

    if (!post) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }

    res.json({
      message: 'Post retrieved successfully',
      post
    });
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update post
export const updatePost = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { postId } = req.params;
    const { title, body } = req.body as UpdatePostInput;
    let post;

    if (req.user!.role === 'admin') {
      // Admin can update any post
      post = await Post.findByIdAndUpdate(
        postId,
        { 
          ...(title && { title }),
          ...(body && { body }),
          updatedBy: req.user!._id
        },
        { new: true, runValidators: true }
      ).populate('author', 'firstName lastName email')
       .populate('createdBy', 'firstName lastName email')
       .populate('updatedBy', 'firstName lastName email');
    } else {
      // Blogger can only update their own post
      post = await Post.findOneAndUpdate(
        { _id: postId, author: req.user!._id },
        { 
          ...(title && { title }),
          ...(body && { body }),
          updatedBy: req.user!._id
        },
        { new: true, runValidators: true }
      ).populate('author', 'firstName lastName email')
       .populate('createdBy', 'firstName lastName email')
       .populate('updatedBy', 'firstName lastName email');
    }

    if (!post) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }

    res.json({
      message: 'Post updated successfully',
      post
    });
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete post
export const deletePost = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { postId } = req.params;
    let post;

    if (req.user!.role === 'admin') {
      // Admin can delete any post
      post = await Post.findByIdAndDelete(postId);
    } else {
      // Blogger can only delete their own post
      post = await Post.findOneAndDelete({ _id: postId, author: req.user!._id });
    }

    if (!post) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }

    res.json({
      message: 'Post deleted successfully'
    });
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};