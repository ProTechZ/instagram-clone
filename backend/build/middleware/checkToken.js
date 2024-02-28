const checkToken = (req, res, next) => {
    const header = req.headers['authorization'];
    if (typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];
        next();
    }
    else {
        res.sendStatus(403);
    }
};
export default checkToken;
