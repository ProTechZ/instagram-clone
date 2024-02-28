import express from 'express';
import { createPost } from '../controllers/posts.controller.js';
import userExists from '../middleware/userExists.js';
const router = express.Router();
router.post('/new-post/user:id', userExists, createPost);
// router.put('/:id', userExists, updateUser);
// router.delete('/:id', userExists, deleteUser);
export default router;
