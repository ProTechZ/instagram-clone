import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import accountsRouter from './routes/accounts.route.js';
import usersRouter from './routes/users.route.js';
import postsRouter from './routes/posts.route.js';
import commentsRouter from './routes/comments.route.js';
import friendsRouter from './routes/friends.route.js';
import pool from './configs/postgres.config.js';
const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config({ path: '../env' });
dotenv.config({ path: ['/env/backend.env', '/env/postgres.env'] });
app.use(cookieParser());
app.use(cors({
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Set-Cookie'],
    origin: ['http://localhost:3000'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.send('Home Screen!');
});
app.get('/isloggedin', (req, res) => {
    if (req.cookies.jwt) {
        return res.send({ loggedIn: true });
    }
    else {
        return res.send({ loggedIn: false });
    }
});
app.get('/userexists/:userId', (req, res) => {
    const { userId } = req.params;
    pool.query('SELECT * FROM users WHERE user_id = $1', [userId], (err, results) => {
        if (err) {
            return res.status(400).send(err);
        }
        else if (results.rows.length <= 0) {
            return res.send(false);
        }
        return res.send(true);
    });
});
app.use('/account', accountsRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);
app.use('/friends', friendsRouter);
app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
});
