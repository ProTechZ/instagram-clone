import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../models/index.js';
const User = db.userModel;
export const signUp = async (req, res) => {
    try {
        console.log('-------------signup-----------------\n');
        const users = await User.findAll();
        console.log('All users:', JSON.stringify(users, null, 2));
        const { username, email, password } = req.body;
        const data = {
            username: username,
            email: email,
            password: await bcrypt.hash(password, 10),
        };
        const user = await User.create(data);
        if (!user) {
            return res.status(409).send('Details are not correct');
        }
        let token = jwt.sign({ id: 123 /*user.id*/ }, process.env.SECRET_KEY, {
            expiresIn: 1 * 24 * 60 * 60 * 1000,
        });
        res.cookie('jwt', token, {
            maxAge: 1 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        });
        console.log('\n------------------------signup end-------------------------');
        return res.status(200).json({ user: user, token: token });
    }
    catch (err) {
        return res.status(400).json({ from: 'signup', err: err });
    }
};
export const logIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({
            where: {
                email: email,
            },
        });
        if (!user) {
            return res.status(401).json({ msg: 'email doesnt exist' });
        }
        const passwordCorrect = await bcrypt.compare(password, password /*user.password*/);
        if (passwordCorrect) {
            return res.status(401).json({ msg: 'password is incorrect' });
        }
        let token = jwt.sign({ id: 123 /*user.id*/ }, process.env.secretKey, {
            expiresIn: 1 * 24 * 60 * 60 * 1000,
        });
        res.cookie('jwt', token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
        console.log('user', JSON.stringify(user, null, 2));
        return res.status(201).json({ user: user, token: token });
    }
    catch (error) {
        return res.status(400).json({ from: 'login', err: error });
    }
};
