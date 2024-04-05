import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import pool from '../configs/postgres.config.js';
import bcrypt from 'bcrypt';

export const signUp = async (req: Request, res: Response) => {
  try {
    const { first_name, last_name, username, email, birthday, password } =
      req.body;

    const avatar = req.body.avatar
      ? req.body.avatar
      : 'https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-media-1677509740';

    const encryptedPsswrd = await bcrypt.hash(password, 10);

    const results = await pool.query(
      `INSERT INTO users(first_name, last_name, username, email, avatar, birthday, password) VALUES(${first_name}, ${last_name}, ${username}, ${email}, ${avatar}, ${birthday}, $${encryptedPsswrd}) RETURNING *`
    );

    const user = results.rows[0];

    let token = jwt.sign(user, process.env.SECRET_KEY!);

    res.cookie('jwt', token, {
      maxAge: 1 * 24 * 60 * 60 * 1000 * 7,
      httpOnly: true,
    });

    return res.status(201).send({
      successful: true,
      msg: `User added with ID: ${user.user_id}`,
      user,
    });
  } catch (err) {
    return res.status(400).send({ successful: false, from: 'signUp', err });
  }
};

export const logIn = async (req: Request, res: Response) => {
  try {
    const { usernameEmail, password } = req.body;

    // be able to log in with username or email
    let query = 'username';
    if ((usernameEmail as string).includes('@')) {
      query = 'email';
    }

    const results = await pool.query(
      `SELECT * FROM users WHERE ${query} = '${usernameEmail}'`
    );

    if (results.rows.length <= 0) {
      return res.send({
        loggedIn: false,
        err: 'No user with that username or email exists',
      });
    }

    const user = results.rows[0];
    const passwordCorrect = await bcrypt.compare(password, user.password);

    if (!passwordCorrect) {
      return res.send({ successful: false, err: 'Password is incorrect' });
    }

    let token = jwt.sign(user, process.env.SECRET_KEY!);

    res.cookie('jwt', token, {
      secure: false,
      maxAge: 1 * 24 * 60 * 60 * 1000 * 7,
      httpOnly: false,
      sameSite: 'lax',
    });

    return res.status(200).send({ user, successful: true });
  } catch (err) {
    console.error(err);
    return res.status(400).send({ from: 'login', successful: false, err });
  }
};

export const logOut = async (req: Request, res: Response) => {
  try {
    res.clearCookie('jwt');

    return res.status(200).send({ successful: true, logged_out: true });
  } catch (err) {
    return res.status(400).send({ from: 'logout', successful: false, err });
  }
};
