const mongoose = require('mongoose');
const User = require('./users') 
const Region = require('./regions') 

const depoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 250
  },
  region_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Region'
  },
  depo_boss_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  depo_sklad_xodim_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

const Depo = mongoose.model('Depo', depoSchema);

module.exports = Depo;
