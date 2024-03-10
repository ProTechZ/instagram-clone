import pool from '../configs/postgres.config.js';
export const createComment = async (req, res) => {
    try {
        const user = res.locals.user;
        const post = res.locals.post;
        const { comment } = req.body;
        pool.query('INSERT INTO comments (user_id, post_id, num_likes, text)' +
            ' VALUES($1, $2, $3, $4) RETURNING * ', [user.user_id, post.post_id, 0, comment], (err, results) => {
            if (err) {
                return res.status(400).send(err);
            }
            const comment = results.rows[0];
            return res.status(201).send({
                created_comment: true,
                comment,
            });
        });
    }
    catch (error) {
        return res.status(400).send({ from: 'createComment', err: error });
    }
};
export const likeComment = async (req, res) => {
    try {
        const comment = res.locals.comment;
        const user = res.locals.user;
        pool.query('INSERT INTO comments_likes(user_id, comment_id) VALUES($1, $2) RETURNING * ', [user.user_id, comment.comment_id], (err, results) => {
            if (err) {
                return res.status(400).send(err);
            }
            pool.query(`UPDATE comments SET num_likes = $1 WHERE comment_id = $2`, [comment.num_likes + 1, comment.comment_id], (err, results) => {
                if (err) {
                    return res.status(400).send({ updated: false, err });
                }
                return res.status(201).send({
                    msg: `Comment ${comment.comment_id} liked by User ${user.user_id}`,
                });
            });
        });
    }
    catch (err) {
        return res.status(400).send({ from: 'likeComment', err });
    }
};
export const editComment = async (req, res) => {
    try {
        const comment = res.locals.comment;
        const { comment: newComment } = req.body;
        if (!newComment) {
            return res
                .status(400)
                .send({ updated: false, err: 'invalid field to update' });
        }
        else if (newComment.length <= 0) {
            return res.status(400).send({ updated: false, err: 'no new comment' });
        }
        pool.query(`UPDATE comments SET text = $1 WHERE comment_id = $2`, [newComment, comment.comment_id], (err, results) => {
            if (err) {
                return res.status(400).send({ updated: false, err });
            }
            return res
                .status(200)
                .send({ updated: true, updatedComment: results.rows[0] });
        });
    }
    catch (err) {
        return res.status(400).send({ from: 'updateComment', err });
    }
};
export const deleteComment = async (req, res) => {
    try {
        const commentId = req.params.commentId;
        pool.query(`DELETE FROM comments WHERE comment_id = $1`, [commentId], (err, results) => {
            if (err) {
                return res.status(400).send({ deleted: false, err });
            }
            return res
                .status(200)
                .send({ deleted: true, deletedComment: results.rows[0] });
        });
    }
    catch (err) {
        return res.status(400).send({ from: 'deleteComment', err });
    }
};
