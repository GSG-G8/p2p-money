const mongoose = require('mongoose');

const { Schema } = mongoose;
const exchangeMoneySchema = new Schema({
  time: {
    type: Date,
    default: Date.now,
  },
  ourRate: {
    buy: Number,
    sell: Number,
  },
  bankRate: {
    buy: Number,
    sell: Number,
  },
  agencyRate: {
    buy: Number,
    sell: Number,
  },
});

module.exports = mongoose.model('exchangeMoney', exchangeMoneySchema);
