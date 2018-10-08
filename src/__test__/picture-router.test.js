'use strict';

const superagent = require('superagent');
const server = require('../lib/server');
const accountMock = require('./lib/account-mock');

const API_URL = `http://localhost:${process.env.PORT}/api/picture`;

describe('/api/picture', () => {
  beforeAll(server.start);
  afterAll(server.stop);
  beforeEach(accountMock.pCleanAccountMocks);

  test('should respond with 200 status code and a picture', () => {
    return accountMock.pCreateMock()
      .then((mock) => {
        return superagent.post(API_URL)
          .set('Authorization', `Bearer ${mock.token}`)
          .field('title', 'The picture says it all')
          .attach('picture', `${__dirname}/assets/oneup.png`);
      })
      .then((response) => {
        expect(response.status).toEqual(200);
      });
  });
});
