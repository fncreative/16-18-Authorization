'use strict';

const faker = require('faker');
const Artist = require('../../model/artist');

const artistMock = module.exports = {};

artistMock.pCreateArtistMocks = () => {
  return new Artist({
    name: faker.lorem.words(2),
  }).save();
};

artistMock.pCleanArtistMocks = () => {
  return Artist.remove({});
};
