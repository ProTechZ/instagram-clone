import pool from '../configs/postgres.config.js';
export const isPostLiked = async (req, res) => {
    try {
        const { postId, userId } = req.params;
        const results = await pool.query(`SELECT * FROM posts_likes WHERE post_id = ${postId} AND user_id = ${userId}`);
        return res.status(201).send({ liked: !!results.rows[0] });
    }
    catch (err) {
        return res.status(400).send({ from: 'likePost', successful: false, err });
    }
};
export const likePost = async (req, res) => {
    try {
        const { postId, userId } = req.params;
        const results = await pool.query(`SELECT * FROM posts WHERE post_id = ${postId}`);
        const currNumLikes = results.rows[0].num_likes;
        await pool.query(`UPDATE posts SET num_likes = '${currNumLikes + 1}' WHERE post_id = ${postId}`);
        await pool.query(`INSERT INTO posts_likes (user_id, post_id) VALUES(${userId}, ${postId}) RETURNING *`);
        return res.status(201).send({ successful: true });
    }
    catch (err) {
        return res.status(400).send({ from: 'likePost', successful: false, err });
    }
};
export const unlikePost = async (req, res) => {
    try {
        const { postId, userId } = req.params;
        const results = await pool.query(`SELECT * FROM posts WHERE post_id = ${postId}`);
        const currNumLikes = results.rows[0].num_likes;
        await pool.query(`UPDATE posts SET num_likes = '${currNumLikes - 1}' WHERE post_id = ${postId}`);
        await pool.query(`DELETE FROM posts_likes where user_id=${userId} AND post_id=${postId}`);
        return res.status(201).send({ successful: true });
    }
    catch (err) {
        return res.status(400).send({ from: 'unlikePost', successful: false, err });
    }
};
export const createPost = async (req, res) => {
    try {
        const { image, caption } = req.body;
        const user = res.locals.user;
        const results = await pool.query('INSERT INTO posts (user_id, image, caption, num_likes, date_posted)' +
            ' VALUES($1, $2, $3, $4, $5) RETURNING *', [user.user_id, image, caption, 0, new Date()]);
        const post = results.rows[0];
        return res.status(201).send({
            successful: true,
            post,
        });
    }
    catch (err) {
        return res.status(400).send({ from: 'createPost', successful: false, err });
    }
};
export const getPost = async (req, res) => {
    try {
        const post = res.locals.post;
        return res.status(200).send({ post, successful: true });
    }
    catch (err) {
        return res.status(400).send({ from: 'getPost', successful: false, err });
    }
};
export const updatePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const fieldToUpdate = Object.keys(req.body)[0];
        const updatedValue = Object.values(req.body)[0];
        if (fieldToUpdate != 'image' &&
            fieldToUpdate != 'caption' &&
            fieldToUpdate != 'num_likes') {
            return res
                .status(400)
                .send({ successful: false, err: 'invalid field to update' });
        }
        else if (!updatedValue) {
            return res
                .status(400)
                .send({ successful: false, err: 'no update value' });
        }
        const results = await pool.query(`UPDATE posts SET ${fieldToUpdate} = '${updatedValue}' WHERE post_id = ${postId}`);
        return res
            .status(200)
            .send({ successful: true, updatedPost: results.rows[0] });
    }
    catch (err) {
        return res.status(400).send({ successful: true, from: 'updatePost', err });
    }
};
export const deletePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const results = await pool.query(`DELETE FROM posts WHERE post_id = ${postId}`);
        return res
            .status(200)
            .send({ successful: true, deletedPost: results.rows[0] });
    }
    catch (err) {
        return res.status(400).send({ from: 'deletePost', successful: false, err });
    }
};
