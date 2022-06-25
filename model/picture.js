const sequelize = require('../config/db');
const {Sequelize} = require('sequelize');

const Picture = sequelize.define('picture', {
        id: {
            type: Sequelize.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },
        url: {type: Sequelize.STRING},
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: {
                msg: '已创建'
            }
        },
        info: {type: Sequelize.STRING},
    },
    {freezeTableName: true});


module.exports = Picture;
