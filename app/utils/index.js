const { ValidationError } = require('sequelize');
const loginStrategy = require('./loginStrategy');
const { uploadBase64Image } = require('./common');

const handleErrors = (err) => {
  const code = 400;
  let message = 'Internal server error';
  if (err instanceof ValidationError) {
    message = err.errors[0].message;
  } else if (err instanceof Error) {
    message = err.message;
  }

  return {
    error: {
      success: false,
      message,
    },
    code,
  };
};

module.exports = {
  handleErrors,
  loginStrategy,
  uploadBase64Image,
};
