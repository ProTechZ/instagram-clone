import express from 'express';
import userExists from '../middleware/userExists.js';
const router = express.Router();
router.post('/:userId', userExists, getUser);
router.put('/:userId', userExists, updateUser);
router.delete('/:userId', userExists, deleteUser);
export default router;
