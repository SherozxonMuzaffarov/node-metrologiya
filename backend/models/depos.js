"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Depo extends Model {
        static associate(models) {
            Depo.belongsTo(models.Region, {
                foreignKey: 'region_id',
                as: 'region'
            })

            Depo.belongsTo(models.User, {
                foreignKey: 'depo_boss_id',
                as: 'boss'
            });

            Depo.belongsTo(models.User, {
                foreignKey: 'depo_sklad_xodim_id',
                as: 'sklad_xodim'
            });
        }
    }
    Depo.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            name: {
                type: DataTypes.STRING(250),
                allowNull: false,
            },
            region_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            depo_boss_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            depo_sklad_xodim_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: "Depo",
            timestamps: true,
        }
    );
    return Depo;
};
