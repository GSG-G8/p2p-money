const mongoose = require('mongoose');

const { Schema } = mongoose;

const transactions = new Schema({
  client_id: {
    type: Schema.Types.ObjectId,
    ref: 'client',
  },
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
  result: {
    type: Number,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
  spread: {
    type: Number,
    required: true,
  },
  saved_money: {
    type: Number,
    required: true,
  },
  operation_time: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('transactions', transactions);
