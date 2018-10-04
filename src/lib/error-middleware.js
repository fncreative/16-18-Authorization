'use strict';

const logger = require('./logger');

module.exports = (error, request, response, next) => { //eslint-disable-line
  logger.log(logger.ERROR, '__ERROR_MIDDLEWARE');
  logger.log(logger.ERROR, error);

  if (error.status) {
    logger.log(logger.ERROR, `Responding with a ${error.status} code and a message of ${error.message}`);
    return response.sendStatus(error.status);
  }
  const errorMessage = error.message.toLocaleLowerCase();

  if (errorMessage.includes('unauthorized')) {
    logger.log(logger.ERROR, 'unauthorized');
    return response.sendStatus(401);
  }
  if (errorMessage.includes('objectid failed')) {
    logger.log(logger.ERROR, 'Responding with a 400 code.');
    logger.log(logger.ERROR, 'could not validate object id');
    return response.sendStatus(400);
  }
  if (errorMessage.includes('validation failed')) {
    logger.log(logger.ERROR, 'Responding with a 400 code.');
    logger.log(logger.ERROR, 'could not validate id');
    return response.sendStatus(400);
  }
  if (errorMessage.includes('not found')) {
    logger.log(logger.ERROR, 'Responding with a 404 code.');
    logger.log(logger.ERROR, 'Bad route.');
    return response.sendStatus(404);
  }
  if (errorMessage.includes('duplicate key')) {
    logger.log(logger.ERROR, 'Responding with a 409 code.');
    logger.log(logger.ERROR, 'duplicate key detected');
    return response.sendStatus(409);
  }
  logger.log(logger.ERROR, 'Responding with a 500 error code');
  return response.sendStatus(500);
};
