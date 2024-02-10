import { DataTypes, Model, Sequelize } from "sequelize";

export default (sequelise: Sequelize, dataTypes: typeof DataTypes) => {
  const User = sequelise.define(
    'user',
    {
      username: {
        type: dataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: dataTypes.STRING,
        unique: true,
        allowNull: false                
      },
      password: {
        type: dataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: true }
  );

  return User;
};
