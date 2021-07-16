/* eslint-disable no-unused-vars */
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
    }
  }
  Post.init(
    {
      body: {
        type: DataTypes.TEXT,
        validate: {
          len: {
            args: [5, 1000],
            msg: 'Body must be between 10 to 1000 characters',
          },
        },
      },
      image: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Post',
    },
  );
  return Post;
};
