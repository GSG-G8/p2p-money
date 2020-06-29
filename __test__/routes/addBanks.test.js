// const superTest = require('supertest');

// const app = require('../../server/app');

// const request = superTest(app);

// const dbConnection = require('../../server/database/dbConnection');
// const buildDB = require('../../server/database/index');

// describe('post request to add /bank', () => {
//   beforeAll(() => buildDB);
//   afterAll(() => dbConnection.close());

//   it('return status 401 for add bank without auth', async (done) => {
//     const response = await request.post('/api/v1/client/bank');
//     expect(response.status).toBe(401);
//     done();
//   });

//   it('return status 400 for same bank account want to add again', async (done) => {
//     request
//       .post('/api/v1/login')
//       .send({
//         email: 'ali@gmail.com',
//         password: 'geeksCA@2020',
//       })
//       .then(async (res) => {
//         const response = await request
//           .post('/api/v1/client/bank')
//           .send({ accountNumber: 63214 })
//           .set('cookie', res.header['set-cookie']);
//         expect(response.status).toBe(400);
//       })
//       .catch();
//     done();
//   });

//   it('return status 400 for same bank account want to add again', async (done) => {
//     request
//       .post('/api/v1/login')
//       .send({
//         email: 'ali@gmail.com',
//         password: 'geeksCA@2020',
//       })
//       .then(async (res) => {
//         const response = await request
//           .post('/api/v1/client/bank')
//           .send({ accountNumber: 963 })
//           .set('cookie', res.header['set-cookie']);
//         expect(response.body.message).toBe(
//           'Please check your data and your Account Number already exist'
//         );
//       });
//     done();
//   });

//   it('return status 200 for add new bank account', async (done) => {
//     request
//       .post('/api/v1/login')
//       .send({
//         email: 'ali@gmail.com',
//         password: 'geeksCA@2020',
//       })
//       .then(async (res) => {
//         const response = await request
//           .post('/api/v1/client/bank')
//           .send({ accountNumber: 212125 })
//           .set('cookie', res.header['set-cookie']);
//         expect(response.status).toBe(200);
//         expect(response.body.message).toBe('User Bank added successfully');
//       });
//     done();
//   });
// });
describe('Test for travis', () => {
  it('Testing to see if Jest works', () => {
    expect(2 + 1).toBe(3);
  });
});
