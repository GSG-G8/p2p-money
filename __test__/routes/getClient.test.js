const superTest = require('supertest');

const app = require('../../server/app');

const request = superTest(app);

const dbConnection = require('../../server/database/dbConnection');
const buildDB = require('../../server/database/index');

describe('post request to /signup', () => {
  beforeEach(() => buildDB);
  afterAll(() => dbConnection.close());

  it('return status 401 for failed without auth get user data', async (done) => {
    const response = await request.get('/api/v1/client');
    expect(response.status).toBe(401);
    done();
  });

  it('return response message successfully for get user data', async (done) => {
    const reqBody = {
      fullName: 'احمد',
      password: '*aA123456*',
      passwordConfirmation: '*aA123456*',
      mainBankName: 'بنك القدس',
      mainBankAccount: 1235,
      email: 'ahmad.salah.test@gmail.com',
    };
    await request
      .post('/api/v1/signup')
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
    request
      .post('/api/v1/login')
      .send({
        email: 'ahmad.salah.test@gmail.com',
        password: '*aA123456*',
      })
      .then(async (res) => {
        const response = await request
          .get('/api/v1/client')
          .set('cookie', res.header['set-cookie']);
        expect(response.status).toBe(200);
      });
    done();
  });
});
