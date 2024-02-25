const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 250
  },
  phone_number: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  depo_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Depo',
    default: null
  },
  role: {
    type: String,
    enum: ['Admin', 'User'],
    required: true,
    default: 'User'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);