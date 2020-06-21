const mongoose = require('mongoose');

const { Schema } = mongoose;
const transactionsSchema = new Schema({
  client_id: {
    type: Schema.Types.ObjectId,
    ref: 'client',
  },
  exchange_id: {
    type: Schema.Types.ObjectId,
    ref: 'exchange_money',
  },
});

module.exports = mongoose.model('transaction', transactionsSchema);
