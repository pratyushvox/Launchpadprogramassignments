import express from 'express';
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} from '../controllers/userController';

const router = express.Router();

// Create a New User
router.post('/', createUser);

//   User Search 
router.get('/', getAllUsers);

//  Get a Single User by ID
router.get('/:id', getUserById);

//  Update User Profile
router.put('/:id', updateUser);

//  Delete a User
router.delete('/:id', deleteUser);

export default router;