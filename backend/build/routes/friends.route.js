import express from 'express';
import { followUser, unFollowUser, getAllFollowed, getAllFollowers, } from '../controllers/friends.controller.js';
import userExists from '../middleware/userExists.js';
import isMatchingUser from '../middleware/isMatchingUser.js';
import isLoggedIn from '../middleware/isLoggedIn.js';
import pool from '../configs/postgres.config.js';
const router = express.Router();
router.get('/follow/:userId/:userToFollow', isLoggedIn, userExists, (req, res, next) => {
    const userToFollowId = req.params.userToFollow;
    pool.query(`SELECT * FROM users WHERE user_id = ${userToFollowId}`, (err, results) => {
        if (err) {
            return res.status(400).send(err);
        }
        else if (results.rows.length <= 0) {
            return res.status(400).send(`user ${userToFollowId} does not exist`);
        }
        next();
    });
}, isMatchingUser({ err: 'not allowed to follow user' }), followUser);
router.get('/unfollow/:userId/:followedUser', isLoggedIn, userExists, (req, res, next) => {
    const followedUser = req.params.followedUser;
    pool.query(`SELECT * FROM users WHERE user_id = ${followedUser}`, (err, results) => {
        if (err) {
            return res.status(400).send(err);
        }
        else if (results.rows.length <= 0) {
            return res.status(400).send(`user ${followedUser} does not exist`);
        }
        next();
    });
}, isMatchingUser({ err: 'not allowed to unfollow user' }), unFollowUser);
router.get('/get-followed/:userId', isLoggedIn, userExists, getAllFollowed);
router.get('/get-followers/:userId', isLoggedIn, userExists, getAllFollowers);
export default router;
