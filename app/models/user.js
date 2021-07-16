/* eslint-disable consistent-return */
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.Post, { foreignKey: 'userId', as: 'posts' });
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [3, 20],
            msg: 'First name must be between 3 and 20 characters',
          },
        },
      },
      lastName: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [3, 20],
            msg: 'Last name must be between 3 and 20 characters',
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: {
            args: true,
            msg: 'Email address is invalid',
          },
          isUnique(value, next) {
            const self = this;
            User.findOne({
              where: { email: value },
              attributes: ['id'],
            }).then((user) => {
              if (user && self.id !== user.id) {
                return next('Email address is already in use');
              }
              next();
            });
          },
        },
      },
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};
