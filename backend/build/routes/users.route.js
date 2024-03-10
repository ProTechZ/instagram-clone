import express from 'express';
import { getUser, updateUser, deleteUser, } from '../controllers/users.controller.js';
import userExists from '../middleware/userExists.js';
import isLoggedIn from '../middleware/isLoggedIn.js';
const router = express.Router();
router.get('/:userId', userExists, isLoggedIn({ err: 'not allowed to view user' }), getUser);
router.put('/:userId', userExists, isLoggedIn({ err: 'not allowed to update user' }), updateUser);
router.delete('/:userId', userExists, isLoggedIn({ err: 'not allowed to delete user' }), deleteUser);
export default router;
