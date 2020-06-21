const { client, admin, exchangeMoney, transactions } = require('../models');

const resetDatabase = async () => {
  try {
    await client.deleteMany();
    await admin.deleteMany();
    await exchangeMoney.deleteMany();
    await transactions.deleteMany();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('database resting Error', err);
    throw err;
  }
};

module.exports = resetDatabase;
