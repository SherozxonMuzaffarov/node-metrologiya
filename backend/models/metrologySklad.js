const mongoose = require('mongoose');

const metrologySkladSchema = new mongoose.Schema({
  nomi: {
    type: String,
    required: true
  },
  soni: {
    type: Number,
    required: true
  },
  ishlabChiqarilganYili: {
    type: Number,
    required: true
  },
  raqami: {
    type: String,
    required: true
  },
  turi: {
    type: String,
    required: true
  },
  ishi: {
    type: String,
    required: true
  },
  izoh: {
    type: String,
    required: true
  },
  depo_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Depo',
    required: true
  }
}, {
  timestamps: true
});

const MetrologySklad = mongoose.model('MetrologySklad', metrologySkladSchema);

module.exports = MetrologySklad;
