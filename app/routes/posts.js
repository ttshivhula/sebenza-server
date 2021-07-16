const express = require('express');
const { handleErrors } = require('../utils');
const { auth, isPostOwner } = require('../middleware');
const {
  createPost,
  getPosts,
  getPost,
  deletePost,
  updatePost,
} = require('../actions/posts');

const router = express.Router();

router.post('/', auth(), (req, res) => {
  createPost(req)
    .then((results) => {
      res.send({
        success: true,
        message: 'Post successfuly created',
        post: results,
      });
    })
    .catch((err) => {
      const response = handleErrors(err);
      res.status(response.code).send(response.error);
    });
});

router.patch('/:id', auth(), isPostOwner, (req, res) => {
  updatePost(req.params.id, req.body)
    .then(() => {
      res.send({
        success: true,
        message: 'Post successfuly updated',
      });
    })
    .catch((err) => {
      const response = handleErrors(err);
      res.status(response.code).send(response.error);
    });
});

router.delete('/:id', auth(), isPostOwner, (req, res) => {
  deletePost(req.params.id)
    .then(() => {
      res.send({
        success: true,
        message: 'Post successfuly deleted',
      });
    })
    .catch((err) => {
      const response = handleErrors(err);
      res.status(response.code).send(response.error);
    });
});

router.get('/:id', auth(), (req, res) => {
  getPost(req.params.id)
    .then((results) => {
      res.send({
        success: true,
        posts: results,
      });
    })
    .catch((err) => {
      const response = handleErrors(err);
      res.status(response.code).send(response.error);
    });
});

router.get('/', auth(), (req, res) => {
  getPosts()
    .then((results) => {
      res.send({
        success: true,
        posts: results,
      });
    })
    .catch((err) => {
      const response = handleErrors(err);
      res.status(response.code).send(response.error);
    });
});

module.exports = router;
