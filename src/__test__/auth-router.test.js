'use strict';

const faker = require('faker');
const superagent = require('superagent');
const accountMock = require('./lib/account-mock');
const server = require('../lib/server');

const API_URL = `http://localhost:${process.env.PORT}`;


describe('AUTH ROUTER', () => {
  beforeAll(server.start);
  afterAll(server.stop);

  test('should return with a 200 status code and a token', () => {
    return superagent.post(`${API_URL}/api/signup`)
      .send({
        username: faker.lorem.words(1),
        password: faker.lorem.words(1),
        email: faker.internet.email(),
      }).then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body.token).toBeTruthy();
      });
  });
  test('should return with a 200 status code and a token if you signup', () => {
    return superagent.post(`${API_URL}/api/signup`)
      .send({
        username: faker.lorem.words(1),
        password: faker.lorem.words(1),
        email: faker.internet.email(),
      }).then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body.token).toBeTruthy();
      });
  });

  test('should return with a 200 status code and a token if you login', () => {
    return accountMock.pCreateMock()
      .then((mock) => {
        return superagent.get(`${API_URL}/api/login`)
          .auth(mock.request.username, mock.request.password);
      })
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body.token).toBeTruthy();
      });
  });
});
