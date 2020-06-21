const mongoose = require('mongoose');

const { Schema } = mongoose;

const exchangeMoney = new Schema({
  amount: {
    type: Number,
    required: true,
  },
  from: {
    type: String,
    required: true,
    trim: true,
  },
  to: {
    type: String,
    required: true,
    trim: true,
  },
  app_price_sell: {
    type: Number,
    required: true,
  },
  app_price_buy: {
    type: Number,
    required: true,
  },
  app_saved_money: {
    type: Number,
    required: true,
  },
  spread: {
    type: Number,
    required: true,
  },
  bank_price_sell: {
    type: Number,
    required: true,
  },
  bank_price_buy: {
    type: Number,
    required: true,
  },
  agency_price_sell: {
    type: Number,
    required: true,
  },
  agency_price_buy: {
    type: Number,
    required: true,
  },
  agency_saved_money: {
    type: Number,
    required: true,
  },
  operation_time: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('exchange_money', exchangeMoney);
