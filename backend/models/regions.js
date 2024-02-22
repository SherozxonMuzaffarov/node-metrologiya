'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Region extends Model {
    static associate(models) {
      Region.hasMany(models.Depo, {
        foreignKey: "region_id",
        as: 'depos'
      })
    }
  }
  Region.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Region',
    timestamps: true
  });
  return Region;
};