'use strict';

const faker = require('faker');
const artistMock = require('./artist-mock');
const Album = require('../../model/album');


const albumMock = module.exports = {};

albumMock.pCreateAlbumMocks = () => {
  const resultMock = {};

  return artistMock.pCreateArtistMocks()
    .then((createdArtistMock) => {
      resultMock.category = createdArtistMock;

      return new Album({
        title: faker.lorem.words(2),
        track: faker.lorem.words(1),
        category: createdArtistMock._id,
      }).save();
    })
    .then((createdAlbumMock) => {
      resultMock.album = createdAlbumMock;
      return resultMock;
    });
};

albumMock.pCleanAlbumMocks = () => {
  return Promise.all([
    Album.remove({}),
    artistMock.pCleanArtistMocks(),
  ]);
};
