const { Post } = require('../models');

const isPostOwner = (req, res, next) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
  }).then((post) => {
    if (!post || post.userId === req.user.id) next();
    else {
      res.status(401).send({
        success: false,
        message: 'Unauthorized',
      });
    }
  });
};

module.exports = {
  isPostOwner,
};
