import { Request, Response } from 'express';
import pool from '../configs/postgres.config.js';

export const createPost = async (req: Request, res: Response) => {
  try {
    const { image, caption } = req.body;
    const user = res.locals.user;

    const results = await pool.query(
      'INSERT INTO posts (user_id, image, caption, num_likes, date_posted)' +
        ' VALUES($1, $2, $3, $4, $5) RETURNING * ',
      [user.user_id, image, caption, 0, new Date()]
    );

    const post = results.rows[0];
    return res.status(201).send({
      successful: true,
      post,
    });
  } catch (err) {
    return res.status(400).send({ from: 'createPost', successful: false, err });
  }
};

export const getPost = async (req: Request, res: Response) => {
  try {
    const post = res.locals.post;

    return res.status(200).send({ post, successful: true });
  } catch (err) {
    return res.status(400).send({ from: 'getPost', successful: false, err });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const postId = req.params.postId;
    const fieldToUpdate = Object.keys(req.body)[0];
    const updatedValue = Object.values(req.body)[0];

    if (
      fieldToUpdate != 'image' &&
      fieldToUpdate != 'caption' &&
      fieldToUpdate != 'num_likes'
    ) {
      return res
        .status(400)
        .send({ successful: false, err: 'invalid field to update' });
    } else if (!updatedValue) {
      return res
        .status(400)
        .send({ successful: false, err: 'no update value' });
    }

    const results = await pool.query(
      `UPDATE posts SET ${fieldToUpdate} = '${updatedValue}' WHERE post_id = ${postId}`
    );

    return res
      .status(200)
      .send({ successful: true, updatedPost: results.rows[0] });
  } catch (err) {
    return res.status(400).send({ successful: true, from: 'updatePost', err });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const postId = req.params.postId;

    const results = await pool.query(
      `DELETE FROM posts WHERE post_id = ${postId}`
    );

    return res
      .status(200)
      .send({ successful: true, deletedPost: results.rows[0] });
  } catch (err) {
    return res.status(400).send({ from: 'deletePost', successful: false, err });
  }
};
