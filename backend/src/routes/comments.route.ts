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
import isAllowed from '../middleware/isAllowed.js';


const router = express.Router();

router.post(
  '/new-comment/user:userId/post:postId',
  userExists,
  postExists,
  isAllowed({ err: 'not allowed to create comment' }),
  createComment
);

router.post(
  '/like-comment/user:userId/comment:commentId',
  userExists,
  commentExists,
  isAllowed({ err: 'not allowed to like comment' }),
  likeComment
);

router.put(
  '/:commentId',
  commentExists,
  isAllowed({ err: 'not allowed to edit comment' }),

  editComment
);

router.delete(
  '/:commentId',
  commentExists,
  isAllowed({ err: 'not allowed to delete comment' }),

  deleteComment
);

export default router;
