import express from 'express';
import {
  getUser,
  updateUser,
  deleteUser,
} from '../controllers/users.controller.js';
import userExists from '../middleware/userExists.js';

const router = express.Router();

router.get('/:id', userExists, getUser);

router.put('/:id', userExists, updateUser);

router.delete('/:id', userExists, deleteUser);

export default router;
