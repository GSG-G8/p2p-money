const mongoose = require('mongoose');
require('env2')('config.env');

let dbURI = '';
switch (process.env.NODE_ENV) {
  case 'production':
    dbURI = process.env.PRODUCT_URI;
    break;
  case 'test':
    dbURI = process.env.TEST_URI;
    break;
  default:
    dbURI = process.env.DEV_URI;
}
mongoose.connect(dbURI, {
  poolSize: 20,
  socketTimeoutMS: 480000,
  keepAlive: 300000,
  keepAliveInitialDelay: 300000,
  connectTimeoutMS: 30000,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 1000,
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;
