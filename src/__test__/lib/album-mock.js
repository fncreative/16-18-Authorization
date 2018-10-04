'use strict';

const faker = require('faker');
const artistMock = require('./artist-mock');
const Album = require('../../model/album');


const albumMock = module.exports = {};

albumMock.pCreateAlbumMock = () => {
  const resultMock = {};

  return artistMock.pCreateArtistMock()
    .then((createdArtistMock) => {
      resultMock.category = createdArtistMock;

      return new Album({
        title: faker.lorem.words(5),
        content: faker.lorem.words(5),
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
    artistMock.pCleanArtistMock(),
  ]);
};
