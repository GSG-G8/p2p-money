const superTest = require('supertest');

const app = require('../../server/app');

const request = superTest(app);

const dbConnection = require('../../server/database/dbConnection');
const buildDB = require('../../server/database/index');

describe('request to add, delete /bank', () => {
  beforeAll(() => buildDB);
  afterAll(() => dbConnection.close());

  // Add Bank Account
  it('return status 401 for add bank without auth', async (done) => {
    const response = await request.post('/api/v1/client/bank');
    expect(response.status).toBe(401);
    done();
  });

  it('return status 400 for same bank account want to add again', async (done) => {
    const reqBody = {
      fullName: 'احمد صلاح',
      password: '*aA123456*',
      passwordConfirmation: '*aA123456*',
      mainBankName: 'بنك فلسطين',
      mainBankAccount: 63214,
      email: 'testbank1@gmail.com',
    };
    request
      .post('/api/v1/signup')
      .send(reqBody)
      .then(async (res) => {
        const response = await request
          .post('/api/v1/client/bank')
          .send({ accountNumber: 63214 })
          .set('cookie', res.header['set-cookie']);
        expect(response.status).toBe(400);
      });
    done();
  });

  it('return error message for same bank account want to add again', async (done) => {
    const reqBody = {
      fullName: 'احمد صلاح',
      password: '*aA123456*',
      passwordConfirmation: '*aA123456*',
      mainBankName: 'بنك فلسطين',
      mainBankAccount: 95874506,
      email: 'testank2@gmail.com',
    };
    request
      .post('/api/v1/signup')
      .send(reqBody)
      .then(async (res) => {
        const response = await request
          .post('/api/v1/client/bank')
          .send({ accountNumber: 963 })
          .set('cookie', res.header['set-cookie']);
        expect(response.body.message).toBe(
          'Please check your data and your Account Number already exist'
        );
      });
    done();
  });

  it('return status 200 for add new bank account', async (done) => {
    const reqBody = {
      fullName: 'احمد صلاح',
      password: '*aA123456*',
      passwordConfirmation: '*aA123456*',
      mainBankName: 'بنك فلسطين',
      mainBankAccount: 632146985,
      email: 'testbank3@gmail.com',
    };
    request
      .post('/api/v1/signup')
      .send(reqBody)
      .then(async (res) => {
        const response = await request
          .post('/api/v1/client/bank')
          .send({ accountNumber: 212125 })
          .set('cookie', res.header['set-cookie']);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('User Bank added successfully');
      });
    done();
  });

  // delete bank Account
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
      mainBankAccount: 12368,
      email: 'testdeletebank2@gmail.com',
    };
    request
      .post('/api/v1/signup')
      .send(reqBody)
      .then(async (res) => {
        const response = await request
          .delete('/api/v1/client/bank')
          .send({ accountNumber: '852147' })
          .set('cookie', res.header['set-cookie']);
        expect(response.status).toBe(400);
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
