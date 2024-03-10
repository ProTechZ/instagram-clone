import jwt from 'jsonwebtoken';
const isLoggedIn = (notLoggedInMsg) => {
    return (req, res, next) => {
        const { jwt: jwtToken } = req.cookies;
        jwt.verify(jwtToken, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(403).send({
                    logged_in: false,
                    ...notLoggedInMsg,
                });
            }
            next();
        });
    };
};
export default isLoggedIn;
