import jwt from 'jsonwebtoken';
import pool from '../configs/postgres.config.js';
export const createPost = async (req, res) => {
    try {
        const { jwt: jwtToken } = req.cookies;
        jwt.verify(jwtToken, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(403).send({ logged_in: false });
            }
        });
        const { image, caption } = req.body;
        const user = res.locals.user;
        const data = [user.user_id, image, caption, 0, new Date()];
        pool.query('INSERT INTO posts (user_id, image, caption, likes, date_posted)' +
            ' VALUES($1, $2, $3, $4, $5) RETURNING * ', data, (err, results) => {
            if (err) {
                return res.status(400).send(err);
            }
            const post = results.rows[0];
            return res.status(201).send({
                created_post: true,
                post,
            });
        });
    }
    catch (error) {
        return res.status(400).send({ from: 'createPost', err: error });
    }
};
export const getPost = async (req, res) => {
    try {
        const post = res.locals.post;
        return res.status(200).send({ post });
    }
    catch (err) {
        return res.status(400).send({ from: 'getPost', err });
    }
};
export const updatePost = async (req, res) => {
    try {
        const { jwt: jwtToken } = req.cookies;
        jwt.verify(jwtToken, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(403).send({
                    logged_in: false,
                    err: 'not allowed to update post',
                });
            }
        });
        const postId = req.params.postId;
        const fieldToUpdate = Object.keys(req.body)[0];
        const updatedValue = Object.values(req.body)[0];
        if (fieldToUpdate != 'image' &&
            fieldToUpdate != 'caption' &&
            fieldToUpdate != 'likes') {
            return res
                .status(400)
                .send({ updated: false, err: 'invalid field to update' });
        }
        else if (!updatedValue) {
            return res.status(400).send({ updated: false, err: 'no update value' });
        }
        pool.query(`UPDATE posts SET ${fieldToUpdate} = '${updatedValue}' WHERE post_id = ${postId}`, (err, results) => {
            if (err) {
                return res.status(400).send({ updated: false, err });
            }
            return res
                .status(200)
                .send({ updated: true, updatedPost: results.rows[0] });
        });
    }
    catch (err) {
        return res.status(400).send({ from: 'updatePost', err });
    }
};
export const deletePost = async (req, res) => {
    try {
        const { jwt: jwtToken } = req.cookies;
        jwt.verify(jwtToken, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                return res
                    .status(403)
                    .send({ logged_in: false, msg: 'not allowed to delete user' });
            }
        });
        const postId = req.params.postId;
        pool.query(`DELETE FROM posts WHERE post_id = ${postId}`, (err, results) => {
            if (err) {
                return res.status(400).send({ deleted: false, err });
            }
            return res
                .status(200)
                .send({ deleted: true, deletedPost: results.rows[0] });
        });
    }
    catch (err) {
        return res.status(400).send({ from: 'deletePost', err });
    }
};
