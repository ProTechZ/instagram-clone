import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { logIn, signUp } from './controllers/userController.js';

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


app.get('/', (req, res) => {
  res.json({ message: 'Home!' });
});

app.post('/signup', signUp);
app.post('/login', logIn);

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
