const {
  client,
  admin,
  exchangeMoney,
  transactions,
  prices,
} = require('../models');

const createEmptyCollection = async () => {
  try {
    await client.createCollection();
    await admin.createCollection();
    await exchangeMoney.createCollection();
    await transactions.createCollection();
    await prices.createCollection();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('creating collection Error', err);
    throw err;
  }
};

module.exports = createEmptyCollection;
