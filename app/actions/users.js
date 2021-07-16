const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const createUser = async (body) => {
  const hash = bcrypt.hashSync(body.password, 10);
  const results = await User.create({
    email: body.email,
    firstName: body.first_name,
    lastName: body.last_name,
    password: hash,
  });
  return results;
};

const login = async (body) => {
  const user = await User.findOne({
    where: {
      email: body.email,
    },
    raw: true,
  });
  if (!user) throw new Error('User not found');
  const match = await bcrypt.compare(body.password, user.password);
  if (!match) throw new Error('Password is incorect');
  delete user.password;
  const token = jwt.sign(user, process.env.SECRET_KEY);
  return {
    user,
    token,
  };
};

module.exports = {
  createUser,
  login,
};
