const { client, admin } = require('../models');

const resetDatabase = async () => {
  try {
    await client.deleteMany();
    await admin.deleteMany();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('database resting Error', err);
    throw err;
  }
};

module.exports = resetDatabase;
