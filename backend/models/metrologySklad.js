'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Metrology_sklad extends Model {
    static associate(models) {
      
    }
  }
  Metrology_sklad.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    nomi: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    soni: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ishlabChiqarilganYili: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    raqami: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    turi: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    ishi: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    izoh: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    depo_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Metrology_sklad',
    timestamps: true
  });
  return Metrology_sklad;
};