import express from 'express';
import {
  getUser,
  updateUser,
  deleteUser,
} from '../controllers/users.controller.js';
import userExists from '../middleware/userExists.js';

const router = express.Router();

router.get('/:userId', userExists, getUser);

router.put('/:userId', userExists, updateUser);

router.delete('/:userId', userExists, deleteUser);

export default router;
