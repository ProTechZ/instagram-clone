import { Sequelize, DataTypes } from 'sequelize';
import userModel from './userModel.js';
import postModel from './postModel.js';
import commentModel from './commentModel.js';
const { PG_USER, PG_HOST, PG_DB, PG_PASSWORD, PG_PORT } = process.env;
const sequelize = new Sequelize(`postgres://${PG_USER}:${PG_PASSWORD}@${PG_HOST}:${PG_PORT}/${PG_DB}`, {
    dialect: 'postgres',
});
sequelize
    .authenticate()
    .then(() => {
    console.log('Database connected');
})
    .catch((err) => {
    console.error(err);
});
const db = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    userModel: userModel(sequelize, DataTypes),
    postModel: postModel(sequelize, DataTypes),
    commentModel: commentModel(sequelize, DataTypes),
};
export default db;
