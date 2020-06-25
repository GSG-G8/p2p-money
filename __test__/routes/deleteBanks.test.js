const superTest = require('supertest');

const app = require('../../server/app');

const request = superTest(app);

const dbConnection = require('../../server/database/dbConnection');
const buildDB = require('../../server/database/index');

describe('post request to delete /bank', () => {
  // beforeAll(() => buildDB);
  afterAll(() => dbConnection.close());

  it('return status 401 for delete bank without auth', async (done) => {
    const response = await request.delete('/api/v1/client/bank');
    expect(response.status).toBe(401);
    done();
  });

  it('return status 400 for delete bank account not exist', async (done) => {
    const reqBody = {
      fullName: 'احمد صلاح',
      password: '*aA123456*',
      passwordConfirmation: '*aA123456*',
      mainBankName: 'بنك فلسطين',
      mainBankAccount: 951,
      email: 'testdeletebank1@gmail.com',
    };
    await request
      .post('/api/v1/signup')
      .send(reqBody)
      .then(async (res) => {
        const response = await request
          .delete('/api/v1/client/bank')
          .send({ accountNumber: 63214 })
          .set('cookie', res.header['set-cookie']);
        expect(response.status).toBe(400);
      })
      .catch();
    done();
  });

  it('return status 400 for delete bank account not exist', async (done) => {
    const reqBody = {
      fullName: 'احمد صلاح',
      password: '*aA123456*',
      passwordConfirmation: '*aA123456*',
      mainBankName: 'بنك فلسطين',
      mainBankAccount: 12368,
      email: 'testdeletebank2@gmail.com',
    };
    request
      .post('/api/v1/signup')
      .send(reqBody)
      .then(async (res) => {
        const response = await request
          .delete('/api/v1/client/bank')
          .send({ accountNumber: 123 })
          .set('cookie', res.header['set-cookie']);
        expect(response.status).toBe(200);
      });
    done();
  });

  it('return status 200 for delete bank account exist', async (done) => {
    const reqBody = {
      fullName: 'احمد صلاح',
      password: '*aA123456*',
      passwordConfirmation: '*aA123456*',
      mainBankName: 'بنك فلسطين',
      mainBankAccount: 963258,
      email: 'testdeletebank3@gmail.com',
    };

    request
      .post('/api/v1/signup')
      .send(reqBody)
      .then(async (res) => {
        await request
          .post('/api/v1/client/bank')
          .send({ accountNumber: 63214 })
          .set('cookie', res.header['set-cookie']);
        const response = await request
          .delete('/api/v1/client/bank')
          .send({ accountNumber: 63214 })
          .set('cookie', res.header['set-cookie']);
        expect(response.status).toBe(200);
      });
    done();
  });
});
