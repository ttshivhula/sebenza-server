const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(`${__dirname}/../../database/config.json`)[env]; // eslint-disable-line import/no-dynamic-require

const userModel = require('./user');
const postModel = require('./post');

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
);

module.exports = {
  User: userModel(sequelize, Sequelize.DataTypes),
  Post: postModel(sequelize, Sequelize.DataTypes),
};
