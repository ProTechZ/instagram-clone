import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { createUser } from './postgre.js';

// import db from './models/index.js';
// import saveUser from './middleware/userAuth.js';
// import { logIn, signUp } from './controllers/userController.js';
// import { createPost } from './controllers/postController.js';

const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config({ path: '../env' });
dotenv.config({ path: ['/env/backend.env', '/env/postgres.env'] });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

process.on('uncaughtException', function (err) {
  console.log(err);
});

// db.sequelize.sync().then(() => {
//   console.log('db has been re sync');
// });

app.get('/', (req, res) => {
  res.json({ message: 'Home!' });
});

app.post('/signup', createUser);
// app.post('/login', logIn);

// app.post('/create-post', createPost);

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
