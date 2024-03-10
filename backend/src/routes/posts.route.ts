import express from 'express';
import {
  getPost,
  createPost,
  updatePost,
  deletePost,
} from '../controllers/posts.controller.js';
import userExists from '../middleware/userExists.js';
import postExists from '../middleware/postExists.js';
import isLoggedIn from '../middleware/isLoggedIn.js';

const router = express.Router();

router.post(
  '/new-post/user:userId',
  userExists,
  isLoggedIn({ err: 'not allowed to create post' }),
  createPost
);

router.get(
  '/:postId',
  postExists,
  isLoggedIn({ err: 'not allowed to view post' }),
  getPost
);

router.put(
  '/:postId',
  postExists,
  isLoggedIn({ err: 'not allowed to update post' }),
  updatePost
);

router.delete(
  '/:postId',
  postExists,
  isLoggedIn({ err: 'not allowed to delete post' }),
  deletePost
);

export default router;
