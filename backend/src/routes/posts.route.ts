import express from 'express';
import {
  getPost,
  createPost,
  updatePost,
  deletePost,
} from '../controllers/posts.controller.js';
import userExists from '../middleware/userExists.js';
import postExists from '../middleware/postExists.js';
import isAllowed from '../middleware/isAllowed.js';

const router = express.Router();

router.post(
  '/new-post/user:userId',
  userExists,
  isAllowed({ err: 'not allowed to create post' }),
  createPost
);

router.get(
  '/:postId',
  postExists,
  isAllowed({ err: 'not allowed to view post' }),
  getPost
);

router.put(
  '/:postId',
  postExists,
  isAllowed({ err: 'not allowed to update post' }),
  updatePost
);

router.delete(
  '/:postId',
  postExists,
  isAllowed({ err: 'not allowed to delete post' }),
  deletePost
);

export default router;
