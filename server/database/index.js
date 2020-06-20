const mongoose = require('mongoose');

const dbConnection = require('./dbConnection');
const { createCollection, resetDatabase } = require('./utils');
const { admin, client } = require('./data');

const buildDatabase = () =>
  new Promise((resolve, reject) => {
    dbConnection
      .then(async () => {
        await resetDatabase();
        await createCollection();
        await admin();
        await client();
      })
      .then(resolve)
      .catch(reject);
  });

buildDatabase()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Database was built successfully !');
    mongoose.disconnect();
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.log(err);
    mongoose.disconnect();
  });
