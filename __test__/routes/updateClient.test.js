const superTest = require('supertest');

const app = require('../../server/app');

const request = superTest(app);

const dbConnection = require('../../server/database/dbConnection');

describe('post request to /signup', () => {
  afterAll(() => dbConnection.close());

  it('return status 401 for failed update without auth', async (done) => {
    const response = await request.patch('/api/v1/client');
    expect(response.status).toBe(401);
    done();
  });

  it('return status 200 for successful update user data', async (done) => {
    const reqBody = {
      email: 'hassan@gmail.com',
      password: 'geeksCA@2020',
    };
    await request
      .post('/api/v1/login')
      .send(reqBody)
      .then(async (res) => {
        const response = await request
          .patch('/api/v1/client')
          .send({ fullName: 'خسان' })
          .set('cookie', res.header['set-cookie']);
        expect(response.status).toBe(200);
      });
    done();
  });

  it('return status 400 and message when change password wrong validation', async (done) => {
    request
      .post('/api/v1/login')
      .send({
        email: 'ahmad.salah.test@gmail.com',
        password: '*aA123456*',
      })
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

  it('return status 200 and message when change password successfully validation', async (done) => {
    request
      .post('/api/v1/login')
      .send({
        email: 'ahmad.salah.test@gmail.com',
        password: '*aA123456*',
      })
      .then(async (res) => {
        const response = await request
          .patch('/api/v1/client')
          .set('cookie', res.header['set-cookie'])
          .send({
            oldPassword: '*aA123456*',
            newPassword: '*aA123457*',
            passwordConfirmation: '*aA123457*',
            email: 'ahmad.salah.test2pass@gmail.com',
          });
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Client updated successfully');
      });
    done();
  });
});
