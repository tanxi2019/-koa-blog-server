const mysql = require('sequelize');

const sequelize = new mysql('blog', 'root', '123456', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define: {   //模型设置
    freezeTableName:true,    //自定义表面，不设置会自动将表名转为复数形式
    timestamps:true    //自动生成更新时间、创建时间字段：updatedAt,createdAt
  }
});


module.exports = sequelize;
