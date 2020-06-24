const loginTests = require('./login');
const signupTests = require('./signup');

const runRoutesTests = async () => {
  await signupTests();
  await loginTests();
};

runRoutesTests();
