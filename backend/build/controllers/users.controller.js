import pool from '../configs/postgres.config.js';
export const getUser = (req, res) => {
    try {
        const userId = req.params.userId;
        let user;
        pool.query(`SELECT * FROM users WHERE user_id = ${userId}`, (err, results) => {
            if (err || results.rows.length <= 0) {
                return res.send({ err: 'user doesnt exist' });
            }
            user = results.rows[0];
        });
        pool.query(`SELECT * FROM posts WHERE user_id = ${userId}`, (err, results) => {
            if (err) {
                return res.send({ err });
            }
            const posts = results.rows;
            return res.status(200).send({ posts, user });
        });
    }
    catch (err) {
        return res.status(400).send({ from: 'getUser', err });
    }
};
export const updateUser = (req, res) => {
    try {
        const userId = req.params.userId;
        const fieldToUpdate = Object.keys(req.body)[0];
        const updatedValue = Object.values(req.body)[0];
        if (fieldToUpdate != 'first_name' &&
            fieldToUpdate != 'last_name' &&
            fieldToUpdate != 'username' &&
            fieldToUpdate != 'email' &&
            fieldToUpdate != 'avatar' &&
            fieldToUpdate != 'birthday') {
            return res
                .status(400)
                .send({ updated: false, err: 'invalid field to update' });
        }
        else if (!updatedValue) {
            return res.status(400).send({ updated: false, err: 'no update value' });
        }
        pool.query(`UPDATE users SET ${fieldToUpdate} = '${updatedValue}' WHERE user_id = ${userId}`, (err, results) => {
            if (err) {
                return res.status(400).send({ updated: false, err });
            }
            return res
                .status(200)
                .send({ updated: true, updatedUser: results.rows[0] });
        });
    }
    catch (err) {
        return res.status(400).send({ from: 'updateUser', err });
    }
};
export const deleteUser = (req, res) => {
    try {
        const userId = req.params.userId;
        pool.query(`DELETE FROM users WHERE user_id = ${userId}`, (err, results) => {
            if (err) {
                return res.status(400).send({ deleted: false, err });
            }
            return res
                .status(200)
                .send({ deleted: true, deletedUser: results.rows[0] });
        });
    }
    catch (err) {
        return res.status(400).send({ from: 'deleteUser', err });
    }
};
