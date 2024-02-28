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
