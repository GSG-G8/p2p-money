const loginTests = require('./login');
// const signupTests = require('./signup');
const logoutTests = require('./logout');

const dbConnection = require('../../server/database/dbConnection');

const runTests = async () => {
  afterAll(() => dbConnection.close());

  // await signupTests();
  await loginTests();
  await logoutTests();
};

runTests();
