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

// const superTest = require('supertest');

// const app = require('../../server/app');

// const request = superTest(app);

// const dbConnection = require('../../server/database/dbConnection');

// const cookie =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6IjVlZjMwODBjNzQ3MDZhZmM1NDBjOGU5YSIsImlhdCI6MTU5Mjk4NTYxMn0.7YMAKvlyVSFuW3EpqO5DjYIWZp1Zpaa6OFvtH7iNW88';

// describe('get all transaction for the given client id', () => {
//   afterAll(() => dbConnection.close());

//   it('return status 200 for successful ', async (done) => {
//     const response = await request
//       .get('/api/v1/transaction')
//       .set('Cookie', [`client=${cookie}`]);
//     console.log(response);
//     expect(response.status).toBe(200);
//     // expect(response.body).({
//     //   message: 'Logout Successfully',
//     // });
//     done();
//   });
//   it('return status 400 if the client is not exists', async (done) => {
//     const response = await request.get('/api/v1/transaction');

//     expect(response.status).toBe(400);
//     // expect(response.body).toStrictEqual({
//     //   message: 'Logout Successfully',
//     // });
//     done();
//   });
// });
