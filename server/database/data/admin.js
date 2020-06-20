const Admin = require('../models/admin');

module.exports = async () => {
  const admin = [
    {
      email: 'eyad@p2pmoney.com',
      password: '$2b$$x4DEJ5nMKgowH6F554uUJ.TKOVjIPQzRjXg2SOmDMeb6chafCJ3u6',
    },
    {
      email: 'admin@p2pmoney.com',
      password: '$2b$10$x4DEJ5nMKgowH6F554uUJ.TKOVjIPQzRjXg2SOmDMeb6chafCJ3u6',
    },
  ];
  await Admin.create(admin);
};
