import express from 'express';
import requiresAuth from '../middleware/permissions.js';
import {
	test,
	registerUser,
	login,
	current,
	logout,
} from '../controllers/auth.js';

const router = express.Router();

router.get('/test', test);

// @route Post /api/auth/register

router.post('/register', registerUser);

// @route Post /api/auth/login

router.post('/login', login);

// @route GET /api/auth/current

router.get('/current', requiresAuth, current);

// @route PUT /api/auth/logout

router.put('/logout', requiresAuth, logout);

export default router;
