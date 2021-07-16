const auth = require('./auth');
const { isPostOwner } = require('./posts');

module.exports = {
  auth,
  isPostOwner,
};
