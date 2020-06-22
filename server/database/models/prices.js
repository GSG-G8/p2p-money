const mongoose = require('mongoose');

const { Schema } = mongoose;

const pricesSchema = new Schema({
  screenPrice: {
    type: Array,
    required: true,
  },
  bankPrice: {
    type: Array,
    required: true,
  },
  tellerPrice: {
    type: Array,
    required: true,
  },
  appPrice: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model('price', pricesSchema);
