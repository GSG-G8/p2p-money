const mongoose = require('mongoose');

const { Schema } = mongoose;
const SchemaTypes = mongoose.Schema.Types;

const transactions = new Schema({
  client_id: {
    type: String,
    required: true,
    trim: true,
  },
  amount: {
    type: SchemaTypes.Float,
    required: true,
    trim: true,
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
    type: String,
    required: true,
    trim: true,
  },
  spread: {
    type: String,
    required: true,
    trim: true,
  },
  saved_money: {
    type: String,
    required: true,
    trim: true,
  },
  operation_time: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model('transactions', transactions);
