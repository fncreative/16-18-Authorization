'use strict';

// one artist has many albums. This is my "one"

const express = require('express');
const bodyParser = require('body-parser');
const HttpError = require('http-errors');
const Artist = require('../model/artist');
const logger = require('../lib/logger');

const jsonParser = bodyParser.json();
const router = module.exports = new express.Router();

router.post('api/artist', jsonParser, (request, response, next) => {
  return new Artist(request.body).save()
    .then((savedArtist) => {
      logger.log(logger.INFO, 'Responding with a 200 status code');
      return response.json(savedArtist);
    })
    .catch(next);
});

router.get('/api/artist/:id', (request, response, next) => {
  return Artist.findById(request.params.id)
    .then((artist) => {
      if (artist) {
        logger.log(logger.INFO, 'Responding with a 200 status code and a Artist');
        return response.json(artist);
      }
      logger.log(logger.INFO, 'Responding with a 404 status code. Artist not found');
      return next(new HttpError(404, 'artist not found'));
    })
    .catch(next);
});
