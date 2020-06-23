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
    trim: true,
    default: null,
  },
  mobileNumber: {
    type: String,
    trim: true,
    default: null,
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
  mainBankName: {
    type: String,
    trim: true,
    required: true,
  },
  mainBankAccount: {
    type: Number,
    trim: true,
    required: true,
  },
  mainBalance: {
    type: Array,
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
