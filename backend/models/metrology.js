'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Metrology extends Model {
    static associate(models) {
    }
  }
  Metrology.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    nomi: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    soni: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ishlabChiqarilganYili: {
      type: DataTypes.INTEGER,
    },
    raqami: {
      type: DataTypes.STRING(250),
    },
    turi: {
      type: DataTypes.STRING(250),
    },
    ishi: {
      type: DataTypes.STRING(250),
    },
    saqlanishJoyi: {
      type: DataTypes.STRING(250),
    },
    serRaqamiSanasi: {
      type: DataTypes.STRING(250),
    },
    serBerganKorxona: {
      type: DataTypes.STRING(250),
    },
    sarflanganMablag: {
      type: DataTypes.STRING(250),
    },
    serKeyingiSanasi: {
      type: DataTypes.STRING(250),
    },
    serDavriyligi: {
      type: DataTypes.STRING(250),
    },
    shartnomaRaqamiSanasi: {
      type: DataTypes.STRING(250),
    },
    izoh: {
      type: DataTypes.STRING(250),
    },
    depo_id: {
      type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    modelName: 'Metrology',
    timestamps: true
  });
  return Metrology;
};