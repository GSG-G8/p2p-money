const Admin = require('../models/admin');

module.exports = async () => {
  const admin = [
    {
      _id: '5099803df3f4948bd2f98391',
      email: 'eyad@p2pmoney.com',
      password: '$2b$10$xlhF9buzqfqLR/sEI/jrGu.Vm2K6GgbSri09PW8qM.vLkl2OC1fsC',
    },
    {
      _id: '5099803df3f4948bd2f98391',
      email: 'admin@p2pmoney.com',
      password: '$2b$10$xlhF9buzqfqLR/sEI/jrGu.Vm2K6GgbSri09PW8qM.vLkl2OC1fsC',
    },
  ];
  await Admin.create(admin);
};
