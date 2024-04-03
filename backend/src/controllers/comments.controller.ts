import { Request, Response } from 'express';
import pool from '../configs/postgres.config.js';

export const createComment = async (req: Request, res: Response) => {
  try {
    const {user, post} = res.locals
    const { comment } = req.body;

    const results = await pool.query(
      'INSERT INTO comments (user_id, post_id, num_likes, text)' +
        ' VALUES($1, $2, $3, $4) RETURNING * ',
      [user.user_id, post.post_id, 0, comment]
    );

    const createdComment = results.rows[0];

    return res.status(201).send({
      successful: true,
      comment: createdComment,
    });
  } catch (err) {
    return res
      .status(400)
      .send({ from: 'createComment', successful: false, err });
  }
};

export const likeComment = async (req: Request, res: Response) => {
  try {
    const comment = res.locals.comment;
    const user = res.locals.user;

    const _ = await pool.query(
      'INSERT INTO comments_likes(user_id, comment_id) VALUES($1, $2) RETURNING * ',
      [user.user_id, comment.comment_id]
    );

    const __ = pool.query(
      `UPDATE comments SET num_likes = $1 WHERE comment_id = $2`,
      [comment.num_likes + 1, comment.comment_id]
    );

    return res.status(201).send({
      msg: `Comment ${comment.comment_id} liked by User ${user.user_id}`,
      successful: true,
    });
  } catch (err) {
    return res
      .status(400)
      .send({ from: 'likeComment', successful: false, err });
  }
};

export const editComment = async (req: Request, res: Response) => {
  try {
    const comment = res.locals.comment;
    const { comment: newComment } = req.body;

    if (!newComment) {
      return res
        .status(400)
        .send({ successful: false, err: 'invalid field to update' });
    } else if ((newComment as string).length <= 0) {
      return res.status(400).send({ successful: false, err: 'no new comment' });
    }

    const results = await pool.query(
      `UPDATE comments SET text = $1 WHERE comment_id = $2`,
      [newComment, comment.comment_id]
    );

    return res
      .status(200)
      .send({ successful: true, updatedComment: results.rows[0] });
  } catch (err) {
    return res
      .status(400)
      .send({ from: 'updateComment', successful: false, err });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const {commentId} = req.params;

    const results = await pool.query(
      `DELETE FROM comments WHERE comment_id = ${commentId}`
    );
    
    return res
      .status(200)
      .send({ successful: true, deletedComment: results.rows[0] });
  } catch (err) {
    return res
      .status(400)
      .send({ from: 'deleteComment', successful: false, err });
  }
};
