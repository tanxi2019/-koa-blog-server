const Category = require('../model/category');

class CategoryServices{
  // 创建分类
  static async categoryCreate(params) {
    return  await Category.create(params)
  }
  // 删除分类
  static async categoryDestroy(id) {
    return Category.destroy({where: {id}});
  }
  // 分类列表
  static async categoryfindAll() {
    return  await Category.findAll();
  }
  // 更新分类
  static async categoryUpdate(name,id) {
    return await Category.update(
        {name},
        {where: {id}});
  }
  // 分类分页，
  static async  categoryfindAndCountAll() {
    return  await await Category.findAndCountAll({
      where:{},
      order: [
        ['createdAt', 'DESC']
      ]
    });
  }
}

module.exports = {
  CategoryServices
};
