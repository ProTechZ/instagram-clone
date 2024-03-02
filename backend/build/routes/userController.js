import jwt from 'jsonwebtoken';
import { v4 } from 'uuid';
import pool from '../configs/postgres.config.js';
import bcrypt from 'bcrypt';
export const signUp = async (req, res) => {
  try {
    const { first_name, last_name, username, email, birthday, password } =
      req.body;
    const avatar = req.body.avatar
      ? req.body.avatar
      : 'https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-media-1677509740';
    const data = [
      first_name,
      last_name,
      username,
      email,
      avatar,
      birthday,
      await bcrypt.hash(password, 10),
    ];
    let token = jwt.sign({ id: v4() }, process.env.SECRET_KEY, {
      expiresIn: 1 * 24 * 60 * 60 * 1000,
    });
    res.cookie('jwt', token, {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    pool.query(
      'INSERT INTO users (first_name, last_name, username, email, avatar, birthday, password)' +
        ' VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING * ',
      data,
      (err, results) => {
        if (err) {
          return res.status(400).send(err);
        }
        return res
          .status(201)
          .send(`User added with ID: ${results.rows[0].user_id}`);
      }
    );
  } catch (err) {
    return res.status(400).send({ from: 'createUser', err });
  }
};
export const logIn = async (req, res) => {
  try {
    const { usernameEmail, password } = req.body;
    // be able to log in with username or email
    let query = 'username';
    if (usernameEmail.includes('@')) {
      query = 'email';
    }
    pool.query(
      `SELECT * FROM users WHERE ${query} = $1`,
      [usernameEmail],
      async (err, results) => {
        if (err) {
          return res.status(400).send(err);
        } else if (results.rows.length <= 0) {
          return res.status(400).send('no user with that username or email');
        }
        const user = results.rows[0];
        const passwordCorrect = await bcrypt.compare(password, user.password);
        if (!passwordCorrect) {
          return res.status(401).send('password is incorrect');
        }
        const { jwt: jwtToken } = req.cookies;
        jwt.verify(jwtToken, process.env.SECRET_KEY, (err, decoded) => {
          if (err) {
            return res.status(403).send('jwt token auth failed');
          } else {
            return res.status(200).send({ msg: 'logged in', user, decoded });
          }
        });
      }
    );
  } catch (err) {
    return res.status(400).send({ from: 'login', err });
  }
};