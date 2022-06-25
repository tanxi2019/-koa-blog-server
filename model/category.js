const sequelize = require('../config/db');
const {Sequelize} = require('sequelize');
const moment = require('moment');

const category = sequelize.define('category', {
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
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        get() {
          return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm')
        }
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        get() {
          return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm')
        }
      }
    },
    {freezeTableName: true});


module.exports = category;
