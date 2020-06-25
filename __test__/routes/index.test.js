const loginTests = require('./login');
const signupTests = require('./signup');
const logoutTests = require('./logout');

const dbConnection = require('../../server/database/dbConnection');
const buildDB = require('../../server/database/index');

const runTests = async () => {
  beforeAll(() => buildDB);
  afterAll(() => dbConnection.close());

  await signupTests();
  await loginTests();
  await logoutTests();
};

runTests();
