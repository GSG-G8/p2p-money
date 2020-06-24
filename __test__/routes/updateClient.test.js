const superTest = require('supertest');
const { sign } = require('jsonwebtoken');

const app = require('../../server/app');

const request = superTest(app);

const dbConnection = require('../../server/database/dbConnection');
const buildDB = require('../../server/database/index');

describe('post request to /signup', () => {
  beforeAll(() => buildDB);
  afterAll(() => dbConnection.close());

  it('return status 401 for failed update without auth', async (done) => {
    const response = await request.patch('/api/v1/client');
    expect(response.status).toBe(401);
    done();
  });

  it('return status 200 for successful update user data', async (done) => {
    const reqBody = {
      fullName: 'احمد صلاح',
      password: '*aA123456*',
      passwordConfirmation: '*aA123456*',
      mainBankName: 'بنك فلسطين',
      mainBankAccount: 897,
      email: 'ahmad@gmail.com',
    };
    request
      .post('/api/v1/signup')
      .send(reqBody)
      .then(async (res) => {
        const response = await request
          .patch('/api/v1/client')
          .send({ fullName: 'احمد' })
          .set('cookie', res.header['set-cookie']);
        expect(response.status).toBe(200);
      });
    done();
  });

  it('return status 200 for successful update user data', async (done) => {
    const reqBody = {
      fullName: 'احمد يوسف صلاح',
      password: '*aA123456*',
      passwordConfirmation: '*aA123456*',
      mainBankName: 'بنك فلسطين',
      mainBankAccount: 555555,
      email: 'ahmad.salah.test@gmail.com',
    };
    request
      .post('/api/v1/signup')
      .send(reqBody)
      .then(async (res) => {
        const response = await request
          .patch('/api/v1/client')
          .set('cookie', res.header['set-cookie'])
          .send({
            oldPassword: '123',
            newPassword: '332',
            passwordConfirmation: '556',
          });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Check your data');
      });
    done();
  });

  // it('return response message successfully for get user data', async (done) => {
  //   const reqBody = {
  //     fullName: 'احمد',
  //     password: '*aA123456*',
  //     passwordConfirmation: '*aA123456*',
  //     mainBankName: 'بنك القدس',
  //     mainBankAccount: 1235,
  //     email: 'ahmad.salah@gmail.com',
  //   };
  //   await request
  //     .post('/api/v1/signup')
  //     .send(reqBody)
  //     .then(async (res) => {
  //       console.log(res);
  //       const response = await request
  //         .get('/api/v1/client')
  //         .set('cookie', res.header['set-cookie']);
  //       expect(response.body.message).toBe('Success');
  //     });
  //   done();
  // });
});
