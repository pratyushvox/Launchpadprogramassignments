import express from 'express';
import { register, login } from '../controllers/authController';
import validate from '../middleware/validation';
import { registerSchema, loginSchema } from '../utils/validationSchemas';

const router = express.Router();

// Register route
router.post('/register', validate(registerSchema), register);

// Login route
router.post('/login', validate(loginSchema), login);

export default router;