import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import router from './routes/userRoutes.js';
import db from './models/index.js';
const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
process.on('uncaughtException', function (err) {
    console.log(err);
});
db.sequelize.sync({ force: true }).then(() => {
    console.log('db has been re sync');
});
app.get('/', (req, res) => {
    res.json({ message: 'Hello World!' });
});
app.use('/api', router);
app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`);
});
