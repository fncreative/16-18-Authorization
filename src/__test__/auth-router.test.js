'use strict';

const faker = require('faker');
const superagent = require('superagent');
const accountMock = require('./lib/account-mock');
const server = require('../lib/server');

const API_URL = `http://localhost:${process.env.PORT}`;


describe('AUTH ROUTER', () => {
  beforeAll(server.start);
  afterAll(server.stop);
  beforeEach(accountMock.pCleanAccountMocks);


  test('should return with a 200 status code and a token', () => {
    return superagent.post(`${API_URL}/api/signup`)
      .send({
        username: faker.lorem.words(1),
        password: faker.internet.password(),
        email: faker.internet.email(),
      }).then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body.token).toBeTruthy();
      });
  });
  test('should return with a 200 status code and a token if you are able to login', () => {
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
  test('should return a 400 error if data is missing, username in this case', () => {
    return superagent.post(`${API_URL}/api/signup`)
      .send({
        password: faker.internet.password(),
        email: faker.internet.email(),
      }).then(Promise.reject)
      .catch((response) => {
        expect(response.status).toEqual(400);
      });
  });
  test('should return a 400 error if not data is sent', () => {
    return superagent.post(`${API_URL}/api/signup`)
      .then(Promise.reject)
      .catch((response) => {
        expect(response.status).toEqual(400);
      });
  });
  test('should return a 400 error if the password is incorrect or does not exist in the system', () => {
    return accountMock.pCreateMock()
      .then((mock) => {
        return superagent.get(`${API_URL}/api/login`)
          .auth(mock.request.username, 'password');
      })
      .then(Promise.reject)
      .catch((response) => {
        expect(response.status).toEqual(400);
      });
  });
  test('should send a 404 error if the url does not exist', () => {
    return superagent.get(`${API_URL}/gregor/is/cute`)
      .then(Promise.reject)
      .catch((response) => {
        expect(response.status).toEqual(404);
      });
  });
});
