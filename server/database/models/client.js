const mongoose = require('mongoose');

const { Schema } = mongoose;
const clientSchema = new Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    trim: true,
  },
  mobileNumber: {
    type: String,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  bankAccounts: {
    type: Array,
    required: true,
  },
  balance: {
    type: Array,
    required: true,
  },
  mainBank: {
    type: Number,
    trim: true,
    required: true,
  },
  avatar: {
    type: String,
    trim: true,
    default: null,
  },
  joinDate: {
    type: Date,
    default: Date.now,
  },
  activeAccount: {
    type: Boolean,
    default: true,
  },
  newsLetter: {
    type: Boolean,
    default: false,
  },
  defaultCurrency: {
    type: String,
    trim: true,
    default: 'ILS',
  },
  feedback: {
    type: String,
    trim: true,
    default: null,
  },
});

module.exports = mongoose.model('client', clientSchema);
