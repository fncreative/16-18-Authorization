'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const HttpError = require('http-errors');
const Account = require('../model/account');
const logger = require('../lib/logger');

const jsonParser = bodyParser.json();
const router = module.exports = new express.Router();

router.post('/api/signup', jsonParser, (request, response, next) => {
  if (!request.body.password) {
    return next(new HttpError(401, ''));
  }
  return Account.create(request.body.username, request.body.email, request.body.password)
    .then((createdAccount) => {
      delete request.body.password;
      logger.log(logger.INFO, 'Auth - creating TOKEN');
      return createdAccount.pCreateToken();
    })
    .then((token) => {
      logger.log(logger.INFO, 'Responding with a 200 status code and a token');
    })
    .catch(next);
});
