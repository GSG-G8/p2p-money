const mongoose = require('mongoose');

const { Schema } = mongoose;
const adminSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
});
module.exports = mongoose.model('admin', adminSchema);
