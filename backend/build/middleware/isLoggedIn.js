import pool from '../configs/postgres.config.js';
const isLoggedIn = (req, res, next) => {
    const commentId = req.params.commentId;
    pool.query('SELECT * FROM comments WHERE comment_id = $1', [commentId], (err, results) => {
        if (err) {
            return res.status(400).send(err);
        }
        else if (results.rows.length <= 0) {
            return res.status(400).send('no comment exists here');
        }
        const comment = results.rows[0];
        res.locals.comment = comment;
        next();
    });
};
export default isLoggedIn;
