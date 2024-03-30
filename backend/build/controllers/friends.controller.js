import pool from '../configs/postgres.config.js';
export const followUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const userToFollow = req.params.userToFollow;
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
        const followedUser = req.params.followedUser;
        const results = await pool.query(`SELECT * FROM followed_following WHERE user_followed_id = ${followedUser} AND user_following_id = ${followingUser}`);
        if (results.rows.length <= 0) {
            return res.send({
                successful: false,
                msg: `User ${followingUser} is not following user ${followedUser}`,
            });
        }
        else {
            const results = await pool.query(`DELETE FROM followed_following WHERE user_followed_id = ${followedUser} AND user_following_id = ${followingUser} RETURNING *`, [followedUser, followingUser]);
            const entry = results.rows[0];
            return res.status(201).send({
                successful: true,
                msg: `User ${followingUser} unfollowed user ${followedUser}`,
                entry,
            });
        }
    }
    catch (err) {
        return res
            .status(400)
            .send({ successful: false, from: 'unFollowUser', err });
    }
};
export const getAllFollowed = async (req, res) => {
    try {
        const userId = req.params.userId;
        const results = await pool.query(`SELECT * FROM followed_following WHERE user_following_id = $${userId}`);
        const usersFollowed = results.rows.map((val) => val.user_followed_id);
        return res.status(200).send({ usersFollowed, successful: true });
    }
    catch (err) {
        return res.status(400).send({ from: 'login', err, successful: false });
    }
};
export const getAllFollowers = async (req, res) => {
    try {
        const userId = req.params.userId;
        const results = await pool.query(`SELECT * FROM followed_following WHERE user_followed_id = ${userId}`);
        const followers = results.rows.map((val) => val.user_following_id);
        return res.status(200).send({ followers, successful: true });
    }
    catch (err) {
        return res.status(400).send({ from: 'login', err, successful: false });
    }
};
