'use strict';

const faker = require('faker');
const superagent = require('superagent');
const server = require('../lib/server');
const artistMock = require('./lib/artist-mock');

//! Vinicio - setting up the testing port, by HAND
const API_URL = `http://localhost:${process.env.PORT}/api/artists`;

describe('/api/categories', () => {
  beforeAll(server.start);
  afterAll(server.stop);
  beforeEach(artistMock.pCleanArtistMocks);

  test('should respond with 200 status code and a new json note', () => {
    const originalRequest = {
      title: faker.lorem.words(3),
      track: faker.lorem.words(15),
    };
    return superagent.post(API_URL)
      .set('Content-Type', 'application/json')
      .send(originalRequest)
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body.title).toEqual(originalRequest.title);
        expect(response.body.track).toEqual(originalRequest.track);

        expect(response.body.timestamp).toBeTruthy();
        expect(response.body._id.toString()).toBeTruthy();
      });
  });

  test('should respond with 200 status code and a json note if there is a matching id', () => {
    let savedArtistMock = null;
    return artistMock.pCreateArtistMock()
      .then((createdArtistMock) => {
        savedArtistMock = createdArtistMock;
        return superagent.get(`${API_URL}/${createdArtistMock._id}`);
      })
      .then((getResponse) => {
        expect(getResponse.status).toEqual(200);

        expect(getResponse.body.timestamp).toBeTruthy();
        expect(getResponse.body._id.toString()).toEqual(savedArtistMock._id.toString());
        expect(getResponse.body.title).toEqual(savedArtistMock.title);
      });
  });
});
