import pool from '../configs/postgres.config.js';
export const followUser = async (req, res) => {
    try {
        const { userId, userToFollow } = req.params;
        const results = await pool.query(`SELECT * FROM followed_following WHERE user_followed_id = ${userToFollow} AND user_following_id = ${userId}`);
        if (results.rows.length >= 1) {
            return res.send({
                successful: false,
                msg: `User ${userId} is already following user ${userToFollow}`,
            });
        }
        else {
            const results = await pool.query(`INSERT INTO followed_following(user_followed_id, user_following_id) VALUES(${userToFollow}, ${userId}) RETURNING *`);
            const entry = results.rows[0];
            return res.status(201).send({
                successful: true,
                msg: `User ${userId} follows user ${userToFollow}`,
                entry,
            });
        }
    }
    catch (err) {
        return res.status(400).send({ successful: false, from: 'followUser', err });
    }
};
export const unFollowUser = async (req, res) => {
    try {
        const followingUser = req.params.userId;
        const followedUser = req.params.userToUnfollow;
        const results = await pool.query(`DELETE FROM followed_following WHERE user_followed_id = ${followedUser} AND user_following_id = ${followingUser} RETURNING *`);
        const entry = results.rows[0];
        return res.status(201).send({
            successful: true,
            msg: `User ${followingUser} unfollowed user ${followedUser}`,
            entry,
        });
    }
    catch (err) {
        return res
            .status(400)
            .send({ successful: false, from: 'unFollowUser', err });
    }
};
export const getAllFollowing = async (req, res) => {
    try {
        const { userId } = req.params;
        const results = await pool.query(`SELECT * FROM followed_following WHERE user_following_id = ${userId}`);
        const following = [];
        const promises = results.rows.map(async ({ user_followed_id }) => {
            const results = await pool.query(`SELECT * FROM users WHERE user_id = ${user_followed_id}`);
            following.push(results.rows[0]);
        });
        await Promise.all(promises);
        return res.status(200).send({ following, successful: true });
    }
    catch (err) {
        return res
            .status(400)
            .send({ from: 'getAllFollowing', err, successful: false });
    }
};
export const getAllFollowers = async (req, res) => {
    try {
        const { userId } = req.params;
        const results = await pool.query(`SELECT * FROM followed_following WHERE user_followed_id = ${userId}`);
        const followers = [];
        const promises = results.rows.map(async ({ user_following_id }) => {
            const results = await pool.query(`SELECT * FROM users WHERE user_id = ${user_following_id}`);
            followers.push(results.rows[0]);
        });
        await Promise.all(promises);
        return res.status(200).send({ followers, successful: true });
    }
    catch (err) {
        return res
            .status(400)
            .send({ from: 'getAllFollowers', err, successful: false });
    }
};
export const isFollowing = async (req, res) => {
    try {
        const { followedUser, followingUser } = req.params;
        const results = await pool.query(`SELECT * FROM followed_following WHERE user_followed_id = ${followedUser} AND user_following_id = ${followingUser}`);
        return res
            .status(200)
            .send({ following: !!results.rows[0], successful: true });
    }
    catch (err) {
        return res
            .status(400)
            .send({ from: 'getAllFollowers', err, successful: false });
    }
};
