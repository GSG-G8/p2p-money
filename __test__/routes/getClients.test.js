const superTest = require('supertest');

const app = require('../../server/app');

const request = superTest(app);

const dbConnection = require('../../server/database/dbConnection');

describe('get request to /getClients', () => {
  beforeAll(() => {});
  afterAll(() => dbConnection.close());

  it('test if you are unauthorized', async (done) => {
    const response = await request.get('/api/v1/admin/getClients');
    expect(response.body).toStrictEqual({
      auth: false,
      message: 'you are Unauthorized',
      statusCode: 401,
    });
    done();
  });

  it('test if get all clients', async (done) => {
    const reqBody = {
      email: 'eyad@p2pmoney.com',
      password: 'geeksCA@2020',
    };
    await request
      .post('/api/v1/login')
      .send(reqBody)
      .then(async (res) => {
        const response = await request
          .get('/api/v1/admin/getClients')
          .set('cookie', res.header['set-cookie']);
        expect(response.body.data[0].mobileNumber).toStrictEqual('0599875794');
      });
    done();
  });
});
