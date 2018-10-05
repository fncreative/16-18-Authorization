'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const HttpError = require('http-errors');
const Picture = require('../model/picture');
const bearerAuthMiddleware = require('../lib/bearer-auth-middleware');

const jsonParser = bodyParser.json();
const router = module.exports = new express.Router();


router.post('/api/picture', bearerAuthMiddleware, jsonParser, (request, response, next) => {
  if (!request.account) {
    return next(new HttpError(400, 'bad request'));
  }
  return new Picture({
    ...request.body,
    account: request.account._id,
  }).save()
    .then(picture => response.json(picture))
    .catch(next);
});
