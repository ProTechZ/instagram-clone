import jwt from 'jsonwebtoken';
import pool from '../configs/postgres.config.js';
export const getUser = async (req, res) => {
    try {
        const id = req.params.id;
        pool.query('SELECT * FROM posts WHERE user_id = $1', [id], (err, results) => {
            if (err) {
                return res.status(400).send({ err });
            }
            const posts = results.rows[0] ? results.rows[0] : [];
            const user = res.locals.user;
            const { jwt: jwtToken } = req.cookies;
            jwt.verify(jwtToken, process.env.SECRET_KEY, (err, decoded) => {
                if (err) {
                    return res.status(403).send({ is_user: false, user, posts });
                }
                else {
                    return res.status(200).send({ is_user: true, posts, ...decoded });
                }
            });
        });
    }
    catch (err) {
        return res.status(400).send({ from: 'getUser', err });
    }
};
export const updateUser = async (req, res) => {
    try {
        const { jwt: jwtToken } = req.cookies;
        jwt.verify(jwtToken, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(403).send({
                    logged_in: false,
                    err: 'not allowed to update user',
                });
            }
        });
        const id = req.params.id;
        const { valueToUpdate, updateValue } = req.body;
        if (valueToUpdate != 'first_name' &&
            valueToUpdate != 'last_name' &&
            valueToUpdate != 'username' &&
            valueToUpdate != 'email' &&
            valueToUpdate != 'avatar' &&
            valueToUpdate != 'birthday') {
            return res
                .status(400)
                .send({ updated: false, err: 'invalid field to update' });
        }
        pool.query(`UPDATE users SET ${valueToUpdate} = '${updateValue}' WHERE user_id = ${id}`, (err, results) => {
            if (err) {
                return res.status(400).send({ updated: false, err });
            }
            return res.status(200).send({ updated: true });
        });
    }
    catch (err) {
        return res.status(400).send({ from: 'updateUser', err });
    }
};
export const deleteUser = async (req, res) => {
    try {
        const { jwt: jwtToken } = req.cookies;
        jwt.verify(jwtToken, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                return res
                    .status(403)
                    .send({ logged_in: false, msg: 'not allowed to delete user' });
            }
        });
        const id = req.params.id;
        pool.query(`DELETE FROM users WHERE user_id = ${id}`, (err, results) => {
            if (err) {
                return res.status(400).send({ deleted: false, err });
            }
            return res.status(200).send({ deleted: true });
        });
    }
    catch (err) {
        return res.status(400).send({ from: 'deleteUser', err });
    }
};
