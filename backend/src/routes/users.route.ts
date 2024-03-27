import express from 'express';
import {
  getUser,
  updateUser,
  deleteUser,
} from '../controllers/users.controller.js';
import userExists from '../middleware/userExists.js';
import isMatchingUser from '../middleware/isMatchingUser.js';
import isLoggedIn from '../middleware/isLoggedIn.js';

const router = express.Router();

router.get(
  '/:userId',
  userExists, 
  getUser
);

router.put(
  '/:userId',
  userExists,

  isLoggedIn,
  isMatchingUser({ err: 'not allowed to update user' }),

  updateUser
);

router.delete(
  '/:userId',
  userExists,

  isLoggedIn,
  isMatchingUser({ err: 'not allowed to delete user' }),

  deleteUser
);

export default router;
