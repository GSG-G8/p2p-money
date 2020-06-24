const superTest = require('supertest');
const { sign } = require('jsonwebtoken');

const app = require('../../server/app');

const request = superTest(app);

const dbConnection = require('../../server/database/dbConnection');
const buildDB = require('../../server/database/index');

describe('post request to /signup', () => {
  beforeAll(() => buildDB);
  afterAll(() => dbConnection.close());

  it('return status 200 for successful get user data', async (done) => {
    const reqBody = {
      fullName: 'احمد يوسف صلاح',
      password: '*aA123456*',
      passwordConfirmation: '*aA123456*',
      mainBankName: 'بنك فلسطين',
      mainBankAccount: 59869876,
      email: 'ahmad@gmail.com',
    };
    const signUp = await request
      .post('/api/v1/signup')
      .send(reqBody)
      .then((res) => {});
    const cookie = signUp.header['set-cookie'];
    const response = await request.get('/api/v1/client');
    // const userToken = { clientId: _id };
    // const cookie = sign(userToken, process.env.SECRET_KEY);
    // const response = await request.cookie('client', cookie);

    expect(response.status).toBe(400);
    done();
  });
});
