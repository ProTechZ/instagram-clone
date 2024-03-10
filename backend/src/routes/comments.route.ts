import express from 'express';
import {
  likeComment,
  createComment,
  editComment,
  deleteComment,
} from '../controllers/comments.controller.js';
import userExists from '../middleware/userExists.js';
import postExists from '../middleware/postExists.js';
import commentExists from '../middleware/commentExists.js';
import isLoggedIn from '../middleware/isLoggedIn.js';

const router = express.Router();

router.post(
  '/new-comment/user:userId/post:postId',
  userExists,
  postExists,
  isLoggedIn({ err: 'not allowed to create comment' }),
  createComment
);

router.post(
  '/like-comment/user:userId/comment:commentId',
  userExists,
  commentExists,
  isLoggedIn({ err: 'not allowed to like comment' }),
  likeComment
);

router.put(
  '/:commentId',
  commentExists,
  isLoggedIn({ err: 'not allowed to edit comment' }),

  editComment
);

router.delete(
  '/:commentId',
  commentExists,
  isLoggedIn({ err: 'not allowed to delete comment' }),

  deleteComment
);

export default router;
