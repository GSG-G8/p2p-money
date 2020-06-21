const { client, admin, exchangeMoney, transactions } = require('../models');

const createEmptyCollection = async () => {
  try {
    await client.createCollection();
    await admin.createCollection();
    await exchangeMoney.createCollection();
    await transactions.createCollection();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('creating collection Error', err);
    throw err;
  }
};

module.exports = createEmptyCollection;
