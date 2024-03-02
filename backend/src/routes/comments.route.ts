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

const router = express.Router();

router.post(
  '/new-comment/user:userId/post:postId',
  userExists,
  postExists,
  createComment
);

router.post(
  '/like-comment/user:userId/comment:commentId',
  userExists,
  commentExists,
  likeComment
);

router.put('/:commentId', commentExists, editComment);

router.delete('/:commentId', commentExists, deleteComment);

export default router;
