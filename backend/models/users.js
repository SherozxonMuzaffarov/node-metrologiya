'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Depo, {
        foreignKey: 'depo_id',
        as: 'depo'
      })
    }
  }
  User.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING(250),
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    depo_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    role: {
      type: DataTypes.ENUM("Admin", 'User', ""),
      allowNull: false,
      defaultValue: "User"
    },
  }, {
    sequelize,
    modelName: 'User',
    timestamps: true,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields:[{ name: 'id'}]
      },
      {
        name: 'phone_number',
        unique: true,
        using: 'BTREE',
        fields:[{ name: 'phone_number'}]
      },
    ]
  });
  return User;
};