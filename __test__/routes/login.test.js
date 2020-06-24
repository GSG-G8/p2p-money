/* eslint-disable */
const superTest = require('supertest');

const app = require('../../server/app');

const request = superTest(app);

const dbConnection = require('../../server/database/dbConnection');

describe('Login to the website', () => {
  beforeAll(() => {});
  afterAll(() => dbConnection.close());

  it('login client by mobile number', async (done) => {
    const response = await request.post('/api/v1/login').send({
      mobileNumber: '0599875794',
      password: 'geeksCA@2020',
    });

    expect(response.body.status).toStrictEqual('successfully');
    done();
  });

  it('login client by email', async (done) => {
    const response = await request.post('/api/v1/login').send({
      email: 'hassan@gmail.com',
      password: 'geeksCA@2020',
    });

    expect(response.body.status).toStrictEqual('successfully');
    done();
  });

  it('login admin by email', async (done) => {
    const response = await request.post('/api/v1/login').send({
      email: 'eyad@p2pmoney.com',
      password: 'geeksCA@2020',
    });

    expect(response.body.status).toStrictEqual('successfully');
    done();
  });

  it('login data is invalid', async (done) => {
    const response = await request.post('/api/v1/login').send({
      email: 'invalid email',
      password: 'invalid password',
    });

    expect(response.body.name).toStrictEqual('ValidationError');
  done();
  });


  it('Not exists user', async (done) => {
    const response = await request.post('/api/v1/login').send({
      email: 'eyad@mail.com',
      password: 'geek###2020',
    });

    expect(response.body).toStrictEqual({
      "status": "failed",
      "message": "User is not exists"
      });
    done();
  });

});
