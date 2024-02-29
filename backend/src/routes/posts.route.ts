import express from 'express';
import {
  getPost,
  createPost,
  updatePost,
  deletePost,
} from '../controllers/posts.controller.js';
import userExists from '../middleware/userExists.js';
import postExists from '../middleware/postExists.js';

const router = express.Router();

router.post('/new-post/user:userId', userExists, createPost);

router.get('/:postId', postExists, getPost);

router.put('/:postId', postExists, updatePost);

router.delete('/:postId', deletePost);

export default router;
