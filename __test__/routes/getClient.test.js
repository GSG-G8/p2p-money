const superTest = require('supertest');

const app = require('../../server/app');

const request = superTest(app);

const dbConnection = require('../../server/database/dbConnection');

describe('post request to /signup', () => {
  afterAll(() => dbConnection.close());

  it('return status 401 for failed without auth get user data', async (done) => {
    const response = await request.get('/api/v1/client');
    expect(response.status).toBe(401);
    done();
  });

  it('return response message successfully for get user data', async (done) => {
    const reqBody = {
      email: 'hassan@gmail.com',
      password: 'geeksCA@2020',
    };
    await request
      .post('/api/v1/login')
      .send(reqBody)
      .then(async (res) => {
        const response = await request
          .get('/api/v1/client')
          .set('cookie', res.header['set-cookie']);
        expect(response.body.message).toBe('Success');
      });
    done();
  });

  it('return status 200 for successful get user data', async (done) => {
    const reqBody = {
      email: 'hassan@gmail.com',
      password: 'geeksCA@2020',
    };
    await request
      .post('/api/v1/login')
      .send(reqBody)
      .then(async (res) => {
        const response = await request
          .get('/api/v1/client')
          .set('cookie', res.header['set-cookie']);
        expect(response.status).toBe(200);
      });
    done();
  });
});
