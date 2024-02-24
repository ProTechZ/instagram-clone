// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import db from '../models/index.js';
// import { Request, Response } from 'express';
export {};
// const User = db.userModel;
// const Post = db.postModel;
// export const allPosts = async (req: Request, res: Response) => {
//   try {
//     // const { jwt: jwtToken } = req.cookies;
//     // jwt.verify(jwtToken, process.env.SECRET_KEY!, (err: any, decoded: any) => {
//     //   if (err) {
//     //     console.log('ERROR: Could not connect to the protected route');
//     //     return res.status(403).json('jwt token auth failed');
//     //   } else {
//     //     console.log('SUCCESS: Connected to protected route');
//     //     return res.status(200).send({
//     //       user: user,
//     //       decoded,
//     //     });
//     //   }
//     // });
//     return res.status(200).send('all posts');
//   } catch (error) {
//     return res.status(400).send({ from: 'createPost', err: error });
//   }
// };
// export const createPost = async (req: Request, res: Response) => {
//   try {
//     const { jwt: jwtToken } = req.cookies;
//     jwt.verify(jwtToken, process.env.SECRET_KEY!, (err: any, decoded: any) => {
//       if (err) {
//         console.log('ERROR: Could not connect to the protected route');
//         return res.status(403).json('jwt token auth failed');
//       }
//     });
//     return res.status(200).send('post created');
//   } catch (error) {
//     return res.status(400).send({ from: 'createPost', err: error });
//   }
// };
