import express from 'express';
import {
  getPost,
  createPost,
  updatePost,
  deletePost,
  likePost,
} from '../controllers/posts.controller.js';
import userExists from '../middleware/userExists.js';
import postExists from '../middleware/postExists.js';
import isMatchingUser from '../middleware/isMatchingUser.js';
import isLoggedIn from '../middleware/isLoggedIn.js';

const router = express.Router();

router.post(
  '/new-post/user:userId',
  userExists,

  isLoggedIn,
  isMatchingUser({ err: 'not allowed to create post' }),

  createPost
);

router.get(
  '/:postId',
  postExists,

  isLoggedIn,
  isMatchingUser({ err: 'not allowed to view post' }),

  getPost
);

router.put(
  '/:postId',
  postExists,

  isLoggedIn,
  isMatchingUser({ err: 'not allowed to update post' }),

  updatePost
);

router.delete(
  '/:postId',
  postExists,

  isLoggedIn,
  isMatchingUser({ err: 'not allowed to delete post' }),

  deletePost
);

router.get(
  '/like-post/:postId/:userId',
  postExists,
  isLoggedIn,
  isMatchingUser({ err: 'not allowed to delete post' }),
  likePost
);

export default router;
