'use strict';

const express = require('express');
const mongoose = require('mongoose');
const logger = require('./logger');
const loggerMiddleware = require('./logger-middleware');
const errorMiddleware = require('./error-middleware');

const artistRoutes = require('../routes/artist-router');
const albumRoutes = require('../routes/albums-router');
const authRoutes = require('../routes/auth-router');
const pictureRoutes = require('../routes/picture-router');

const app = express();
app.use(loggerMiddleware);

app.use(artistRoutes);
app.use(albumRoutes);
app.use(authRoutes);
app.use(pictureRoutes);

app.all('*', (request, response) => {
  logger.log(logger.INFO, 'Returning a 404 from catch-all/default route (the route was not found');
  return response.sendStatus(404);
});

app.use(errorMiddleware);
const server = module.exports = {};
let internalServer = null;

server.start = () => {
  return mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
      internalServer = app.listen(process.env.PORT, () => {
        logger.log(logger.INFO, `Server is on at PORT: ${process.env.PORT}`);
      });
    });
};

server.stop = () => {
  return mongoose.disconnect()
    .then(() => {
      internalServer.close(() => {
        logger.log(logger.INFO, 'The server is OFF.');
      });
    });
};
