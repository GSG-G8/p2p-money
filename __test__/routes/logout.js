const superTest = require('supertest');

const app = require('../../server/app');

const request = superTest(app);

const cookie =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6IjVlZjMwODBjNzQ3MDZhZmM1NDBjOGU5YSIsImlhdCI6MTU5Mjk4NTYxMn0.7YMAKvlyVSFuW3EpqO5DjYIWZp1Zpaa6OFvtH7iNW88';

const logoutTests = () => {
  describe('post request to /logout', () => {
    it('return status 200 for successful logout client', async (done) => {
      const response = await request
        .post('/api/v1/logout')
        .set('Cookie', [`client=${cookie}`]);
      expect(response.body).toStrictEqual({
        message: 'Logout Successfully',
      });
      done();
    });
    it('return status 200 for successful logout admin', async (done) => {
      const response = await request
        .post('/api/v1/logout')
        .set('Cookie', [`admin=${cookie}`]);
      expect(response.body).toStrictEqual({
        message: 'Logout Successfully',
      });
      done();
    });
    it('return bad request with status 400 if do not have cookies', async (done) => {
      const response = await request.post('/api/v1/logout');
      expect(response.body).toStrictEqual({
        message: `you're not sign-in`,
      });
      done();
    });
  });
};

module.exports = logoutTests;
