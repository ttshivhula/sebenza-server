const express = require('express');
const { createUser, login } = require('../actions/users');
const { handleErrors } = require('../utils');

const router = express.Router();

router.post('/register', (req, res) => {
  createUser(req.body)
    .then(() => {
      res.send({
        success: true,
        message: 'User account created',
      });
    })
    .catch((err) => {
      const response = handleErrors(err);
      res.status(response.code).send(response.error);
    });
});

router.post('/login', (req, res) => {
  login(req.body)
    .then((results) => res.send({
      success: true,
      message: 'User successfuly logged in',
      ...results,
    }))
    .catch((err) => {
      const response = handleErrors(err);
      res.status(response.code).send(response.error);
    });
});

module.exports = router;
