const superTest = require('supertest');

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

  // it('return status 200 for successful update user data', async (done) => {
  //   const reqBody = {
  //     fullName: 'احمد صلاح',
  //     password: '*aA123456*',
  //     passwordConfirmation: '*aA123456*',
  //     mainBankName: 'بنك فلسطين',
  //     mainBankAccount: 897,
  //     email: 'ahmad@gmail.com',
  //   };
  //   request
  //     .post('/api/v1/signup')
  //     .send(reqBody)
  //     .then(async (res) => {
  //       const response = await request
  //         .patch('/api/v1/client')
  //         .send({ fullName: 'احمد' })
  //         .set('cookie', res.header['set-cookie']);
  //       expect(response.status).toBe(200);
  //     });
  //   done();
  // });

  // it('return status 400 and message when change password wrong validation', async (done) => {
  //   const reqBody = {
  //     fullName: 'احمد يوسف صلاح',
  //     password: '*aA123456*',
  //     passwordConfirmation: '*aA123456*',
  //     mainBankName: 'بنك فلسطين',
  //     mainBankAccount: 555555,
  //     email: 'ahmad.salah.test@gmail.com',
  //   };
  //   request
  //     .post('/api/v1/signup')
  //     .send(reqBody)
  //     .then(async (res) => {
  //       const response = await request
  //         .patch('/api/v1/client')
  //         .set('cookie', res.header['set-cookie'])
  //         .send({
  //           oldPassword: '123',
  //           newPassword: '332',
  //           passwordConfirmation: '556',
  //         });
  //       expect(response.status).toBe(400);
  //       expect(response.body.message).toBe('Check your data');
  //     });
  //   done();
  // });

  // it('return status 200 and message when change password successfully validation', async (done) => {
  //   const reqBody = {
  //     fullName: 'test2',
  //     password: '*aA123456*',
  //     passwordConfirmation: '*aA123456*',
  //     mainBankName: 'بنك فلسطين',
  //     mainBankAccount: 963,
  //     email: 'ahmad.salah.test2@gmail.com',
  //   };
  //   request
  //     .post('/api/v1/signup')
  //     .send(reqBody)
  //     .then(async (res) => {
  //       const response = await request
  //         .patch('/api/v1/client')
  //         .set('cookie', res.header['set-cookie'])
  //         .send({
  //           oldPassword: '*aA123456*',
  //           newPassword: '*aA123457*',
  //           passwordConfirmation: '*aA123457*',
  //           email: 'ahmad.salah.test2pass@gmail.com',
  //         });
  //       expect(response.status).toBe(200);
  //       expect(response.body.message).toBe('Client updated successfully');
  //     });
  //   done();
  // });
});
