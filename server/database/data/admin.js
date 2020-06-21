const Admin = require('../models/admin');

module.exports = async () => {
  const admin = [
    {
      email: 'eyad@p2pmoney.com',
      password: '$2b$10$xlhF9buzqfqLR/sEI/jrGu.Vm2K6GgbSri09PW8qM.vLkl2OC1fsC',
    },
    {
      email: 'admin@p2pmoney.com',
      password: '$2b$10$xlhF9buzqfqLR/sEI/jrGu.Vm2K6GgbSri09PW8qM.vLkl2OC1fsC',
    },
  ];
  await Admin.create(admin);
};
