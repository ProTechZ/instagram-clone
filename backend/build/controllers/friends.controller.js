import pool from '../configs/postgres.config.js';
export const followUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const userToFollow = req.params.userToFollow;
        pool.query('SELECT * FROM followed_following WHERE user_followed_id = $1 AND user_following_id = $2', [userToFollow, userId], (err, results) => {
            if (err) {
                return res.send({ err });
            }
            else if (results.rows.length >= 1) {
                return res.send({ already_following: true });
            }
            else {
                pool.query('INSERT INTO followed_following(user_followed_id, user_following_id) VALUES($1, $2) RETURNING *', [userToFollow, userId], (err, results) => {
                    if (err) {
                        res.send({ err });
                    }
                    const entry = results.rows[0];
                    return res.status(201).send({
                        msg: `User ${userId} follows user ${userToFollow}`,
                        entry,
                    });
                });
            }
        });
    }
    catch (err) {
        return res.status(400).send({ loggedIn: false, from: 'followUser', err });
    }
};
export const unFollowUser = async (req, res) => {
    try {
        const followingUser = req.params.userId;
        const followedUser = req.params.followedUser;
        pool.query('SELECT * FROM followed_following WHERE user_followed_id = $1 AND user_following_id = $2', [followedUser, followingUser], (err, results) => {
            if (err) {
                return res.send({ err });
            }
            else if (results.rows.length <= 0) {
                return res.send({ not_followed: true });
            }
            else {
                pool.query('DELETE FROM followed_following WHERE user_followed_id = $1 AND user_following_id = $2 RETURNING *', [followedUser, followingUser], (err, results) => {
                    if (err) {
                        return res.send({ err });
                    }
                    const entry = results.rows[0];
                    return res.status(201).send({
                        msg: `User ${followingUser} unfollowed user ${followedUser}`,
                        entry,
                    });
                });
            }
        });
    }
    catch (err) {
        return res.status(400).send({ from: 'unFollowUser', err });
    }
};
export const getAllFollowed = async (req, res) => {
    try {
        const userId = req.params.userId;
        pool.query(`SELECT * FROM followed_following WHERE user_following_id = $${userId}`, (err, results) => {
            if (err) {
                return res.send({ err });
            }
            const usersFollowed = results.rows.map((val) => val.user_followed_id);
            return res.status(200).send({ usersFollowed });
        });
    }
    catch (err) {
        return res.status(400).send({ from: 'login', err });
    }
};
export const getAllFollowers = async (req, res) => {
    try {
        const userId = req.params.userId;
        pool.query(`SELECT * FROM followed_following WHERE user_followed_id = $1`, [userId], (err, results) => {
            if (err) {
                return res.send({ err });
            }
            const followers = results.rows.map((val) => val.user_following_id);
            return res.status(200).send({ followers });
        });
    }
    catch (err) {
        return res.status(400).send({ from: 'login', err });
    }
};
