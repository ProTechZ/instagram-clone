import express from 'express';
import { signUp, logIn, logOut } from '../controllers/accounts.controller.js';
import jwt from 'jsonwebtoken';
const router = express.Router();
const isLoggedIn = (req, res, next) => {
    const { jwt: token } = req.cookies;
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).send({
                logged_in: false,
                err: 'not even logged in',
            });
        }
        next();
    });
};
router.post('/signup', signUp);
router.post('/login', logIn);
router.post('/logout', isLoggedIn, logOut);
export default router;
