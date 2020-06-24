const loginTests = require('./login');
const signupTests = require('./signup');
const logoutTests = require('./logout');

const runRoutesTests = async () => {
  await signupTests();
  await loginTests();
  await logoutTests();
};

runRoutesTests();
