const { Post, User } = require('../models');
const { uploadBase64Image } = require('../utils');

const createPost = async (req) => {
  let image = null;
  if (
    !req.body.body
    || !(req.body.body.length > 4 && req.body.body.length < 1001)
  ) throw new Error('Body must be between 5 to 1000 characters');
  if (req.body.image) {
    const uploadResults = await uploadBase64Image(req.body.image);
    image = uploadResults.Location;
  }
  return Post.create({
    userId: req.user.id,
    body: req.body.body,
    image,
  });
};

const getPosts = async () => {
  Post.belongsTo(User, { foreignKey: 'userId' });
  return Post.findAll({
    include: [
      {
        model: User,
        attributes: {
          exclude: ['password'],
        },
      },
    ],
    order: [['id', 'DESC']],
  });
};

const getPost = async (id) => {
  Post.belongsTo(User, { foreignKey: 'userId' });
  const post = await Post.findOne({
    where: {
      id,
    },
    include: [
      {
        model: User,
        attributes: {
          exclude: ['password'],
        },
      },
    ],
  });
  if (!post) throw new Error('Post does not exits');
  return post;
};

const deletePost = async (id) => {
  const post = await getPost(id);
  return Post.destroy({
    where: {
      id: post.id,
    },
  });
};

const updatePost = async (id, body) => {
  const post = await getPost(id);
  return Post.update({ body: body.body }, { where: { id: post.id } });
};

module.exports = {
  createPost,
  getPosts,
  getPost,
  deletePost,
  updatePost,
};
