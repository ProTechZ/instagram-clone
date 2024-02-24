import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../models/index.js';
const User = db.userModel;
export const signUp = async (req, res) => {
    try {
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
        let token = jwt.sign({ id: user.get('id') }, process.env.SECRET_KEY, {
            expiresIn: 1 * 24 * 60 * 60 * 1000,
        });
        res.cookie('jwt', token, {
            maxAge: 1 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        });
        return res.status(200).send({ user: user });
    }
    catch (err) {
        return res.status(400).send({ from: 'signup', err: err });
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
            return res.status(401).send({ msg: 'email doesnt exist' });
        }
        const passwordCorrect = await bcrypt.compare(password, user.get('password'));
        if (!passwordCorrect) {
            return res.status(401).send({ msg: 'password is incorrect' });
        }
        const { jwt: jwtToken } = req.cookies;
        jwt.verify(jwtToken, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                console.log('ERROR: Could not connect to the protected route');
                return res.status(403).json('jwt token auth failed');
            }
            else {
                console.log('SUCCESS: Connected to protected route');
                return res.status(200).send({
                    user: user,
                    decoded,
                });
            }
        });
    }
    catch (error) {
        return res.status(400).send({ from: 'login', err: error });
    }
};
