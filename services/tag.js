const Tag = require('../model/tag');
// const Article = require('../model/article');


class TagServices{
  // 创建标签
  static async tagCreate(params) {
    return  await Tag.create(params)
  }
  // 删除标签
  static async tagDestroy(id) {
    return Tag.destroy({where: {id}});
  }
  // 标签列表
  static async tagfindAll() {
    return  await Tag.findAll(
    //     {
    //   include:[{
    //     model:Article
    //   }]
    // }
    );
  }
  // 更新标签
  static async tagUpdate(name,id) {
    return await Tag.update(
        {name},
        {where: {id}});
  }
  // 标签分页
  static async  tagfindAndCountAll() {
    return  await await Tag.findAndCountAll({
      where:{},
      order: [
        ['createdAt', 'DESC']
      ]
    });
  }
}

module.exports = {
  TagServices
};
