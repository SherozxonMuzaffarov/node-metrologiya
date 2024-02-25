const mongoose = require('mongoose');

const metrologySchema = new mongoose.Schema({
  nomi: {
    type: String,
    required: true
  },
  soni: {
    type: Number,
    required: true
  },
  ishlabChiqarilganYili: {
    type: Number
  },
  raqami: {
    type: String
  },
  turi: {
    type: String
  },
  ishi: {
    type: String
  },
  saqlanishJoyi: {
    type: String
  },
  serRaqamiSanasi: {
    type: String
  },
  serBerganKorxona: {
    type: String
  },
  sarflanganMablag: {
    type: String
  },
  serKeyingiSanasi: {
    type: String
  },
  serDavriyligi: {
    type: String
  },
  shartnomaRaqamiSanasi: {
    type: String
  },
  izoh: {
    type: String
  },
  depo_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Depo'
  }
}, {
  timestamps: true
});

const Metrology = mongoose.model('Metrology', metrologySchema);

module.exports = Metrology;
