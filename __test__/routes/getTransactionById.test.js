// /* eslint-disable no-undef */
// const superTest = require('supertest');

// const app = require('../../server/app');

// const request = superTest(app);

// const dbConnection = require('../../server/database/dbConnection');
// const buildDB = require('../../server/database/index');

// describe('test get transaction router', () => {
//   beforeAll(() => buildDB);
//   afterAll(() => dbConnection.close());

//   it('return status 401 for unauthorized access', async (done) => {
//     const response = await request.get('/api/v1/transaction');
//     expect(response.status).toBe(401);
//     done();
//   });

//   it('return status 200 for success', async (done) => {
//     await request;
//     request
//       .post('/api/v1/login')
//       .send({
//         email: 'ali@gmail.com',
//         password: 'geeksCA@2020',
//       })
//       .then(async (res) => {
//         const response = await request
//           .get('/api/v1/transaction')
//           .set('cookie', res.header['set-cookie']);
//         expect(response.status).toBe(200);
//       });
//     done();
//   });
// });
describe('Test for travis', () => {
  it('Testing to see if Jest works', () => {
    expect(2 + 1).toBe(3);
  });
});
