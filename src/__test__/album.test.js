'use strict';

const superagent = require('superagent');
const server = require('../lib/server');
const AlbumMock = require('./lib/album-mock');

const API_URL = `http://localhost:${process.env.PORT}/api/albums`;

describe('/api/albums', () => {
  beforeAll(server.start);
  afterAll(server.stop);
  beforeEach(AlbumMock.pCleanAlbumMocks);

  test('should respond with 200 status and an updated card', () => {
    let savedMock;
    return AlbumMock.pCreateAlbumMocks()
      .then((mock) => {
        savedMock = mock;
        return superagent.put(`${API_URL}/${mock.album._id}`)
          .send({
            title: 'I am a new and updated title',
          });
      })
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body.track).toEqual(savedMock.blogPost.track);
        expect(response.body.title).toEqual('I am a new and updated title');
      });
  });
});
