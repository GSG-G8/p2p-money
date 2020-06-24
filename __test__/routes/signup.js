const superTest = require('supertest');

const app = require('../../server/app');

const request = superTest(app);

const dbConnection = require('../../server/database/dbConnection');
const buildDB = require('../../server/database/index');

const signupTests = () => {
  describe('post request to /signup', () => {
    beforeAll(() => buildDB);
    afterAll(() => dbConnection.close());

    it('return status 200 for successful singup', async (done) => {
      const reqBody = {
        fullName: 'حسان النجار',
        password: '*hassan123*',
        passwordConfirmation: '*hassan123*',
        mainBankName: 'بنك القدس',
        mainBankAccount: 111798451,
        email: 'ali@hotmail.com',
      };
      const response = await request.post('/api/v1/signup').send(reqBody);
      expect(response.status).toBe(200);
      done();
    });
    it('return bad request with status 400 if bank Account is already taken', async (done) => {
      const reqBody = {
        fullName: 'حسان النجار',
        password: '*hassan123*',
        passwordConfirmation: '*hassan123*',
        mainBankName: 'بنك القدس',
        mainBankAccount: 7895648237,
        email: 'hassan@gmail.com',
      };

      const response = await request.post('/api/v1/signup').send(reqBody);
      expect(response.body).toStrictEqual({
        status: 400,
        message: `Bank account [${reqBody.mainBankAccount}] is already exists, please sign-in`,
      });
      done();
    });
    it('return bad request with status 400 if mobile Number is already taken', async (done) => {
      const reqBody = {
        fullName: 'أحمد صلاح',
        password: '*hassan123*',
        passwordConfirmation: '*hassan123*',
        mainBankName: 'بنك القدس',
        mainBankAccount: 789586482237,
        mobileNumber: '0599875794',
      };

      const response = await request.post('/api/v1/signup').send(reqBody);
      expect(response.body).toStrictEqual({
        status: 400,
        message: `${reqBody.mobileNumber} is already exists, please sign-in`,
      });
      done();
    });
    it('return bad request with status 400 if Email is already taken', async (done) => {
      const reqBody = {
        fullName: 'أحمد صلاح',
        password: '*hassan123*',
        passwordConfirmation: '*hassan123*',
        mainBankName: 'بنك القدس',
        mainBankAccount: 7895864822387,
        email: 'ahmed@gmail.com',
      };

      const response = await request.post('/api/v1/signup').send(reqBody);
      expect(response.body).toStrictEqual({
        status: 400,
        message: `${reqBody.email} is already exists, please sign-in`,
      });
      done();
    });
  });
};

module.exports = signupTests;
