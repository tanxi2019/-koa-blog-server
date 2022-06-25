// 数据模型
const sequelize = require('../config/db');
const {Sequelize} = require('sequelize');

const Admin = sequelize.define('admin', {
  id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: {
      msg: '已创建'
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  avatar: {type: Sequelize.STRING}
},
    {freezeTableName: true});



module.exports = Admin;
