'use strict';

const faker = require('faker');
const Artist = require('../../model/artist');

const artistMock = module.exports = {};

artistMock.pCreateArtistMock = () => {
  return new Artist({
    name: faker.lorem.words(10),
  }).save();
};

artistMock.pCleanArtistMocks = () => {
  return Artist.remove({});
};
