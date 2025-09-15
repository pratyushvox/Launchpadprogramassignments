import express from 'express';
import { 
  createPost, 
  getPosts, 
  getPost, 
  updatePost, 
  deletePost 
} from '../controllers/postController';
import { auth, authorize } from '../middleware/auth';
import validate from '../middleware/validation';
import { postSchema, updatePostSchema } from '../utils/validationSchemas';

const router = express.Router();

// All routes require authentication
router.use(auth);
router.use(authorize('blogger', 'admin'));

// Create a new post
router.post('/', validate(postSchema), createPost);

// Get all posts
router.get('/', getPosts);

// Get single post
router.get('/:postId', getPost);

// Update post
router.patch('/:postId', validate(updatePostSchema), updatePost);

// Delete post
router.delete('/:postId', deletePost);

export default router;