/* eslint-disable no-undef */
const superTest = require('supertest');

const app = require('../../server/app');

const request = superTest(app);

const dbConnection = require('../../server/database/dbConnection');
const buildDB = require('../../server/database/index');

describe('test get transaction router', () => {
  beforeAll(() => buildDB);
  afterAll(() => dbConnection.close());

  it('return status 401 for unauthorized access', async (done) => {
    const response = await request.get('/api/v1/transaction');
    expect(response.status).toBe(401);
    done();
  });

  it('return status 200 for success', async (done) => {
    const reqBody = {
      fullName: 'محمد أحمد ',
      password: '*aA123456*',
      passwordConfirmation: '*aA123456*',
      mainBankName: 'بنك فلسطين',
      mainBankAccount: 1237548465,
      email: 'moh@ahm.com',
    };
    await request
      .post('/api/v1/signup')
      .send(reqBody)
      .then(async (res) => {
        const response = await request
          .get('/api/v1/transaction')
          .set('cookie', res.header['set-cookie']);
        expect(response.status).toBe(200);
      });
    done();
  });
});
