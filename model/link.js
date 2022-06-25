const sequelize = require('../config/db');
const {Sequelize} = require('sequelize');

const Link = sequelize.define('link', {
        id: {
            type: Sequelize.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
             allowNull: false,
             unique: {
                msg: '已创建'
            }
        },
        link: {type: Sequelize.STRING}
    },
    {freezeTableName: true});

module.exports = Link;
