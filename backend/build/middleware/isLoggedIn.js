import jwt from 'jsonwebtoken';
const isLoggedIn = (req, res, next) => {
    const { jwt: token } = req.cookies;
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).send({
                loggedIn: false,
                err: 'not logged in',
            });
        }
        next();
    });
};
export default isLoggedIn;
