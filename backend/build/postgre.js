import jwt from 'jsonwebtoken';
import pg from 'pg';
import { v4 } from 'uuid';
const { PG_USER, PG_HOST, PG_DB, PG_PASSWORD, PG_PORT } = process.env;
const pool = new pg.Pool({
    user: PG_USER,
    host: PG_HOST,
    database: PG_DB,
    password: PG_PASSWORD,
    port: parseInt(PG_PORT),
});
export const signUp = (req, res) => {
    try {
        const { username, email, birthday, password } = req.body;
        const avatar = req.body.avatar
            ? req.body.avatar
            : 'https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-media-1677509740';
        let token = jwt.sign({ id: v4() }, process.env.SECRET_KEY, {
            expiresIn: 1 * 24 * 60 * 60 * 1000,
        });
        res.cookie('jwt', token, {
            maxAge: 1 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        });
        pool.query('INSERT INTO users (username, email, avatar, birthday, password) VALUES ($1, $2, $3, $4, $5) RETURNING *', [username, email, avatar, birthday, password], (err, results) => {
            if (err) {
                return res.status(400).send(err);
            }
            return res
                .status(201)
                .send(`User added with ID: ${results.rows[0].user_id}`);
        });
    }
    catch (err) {
        return res.status(400).send({ from: 'createUser', err });
    }
};
