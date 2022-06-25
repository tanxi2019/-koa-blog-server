const Article = require('../model/article');

class  ArticleServices{
  // 创建文章
  static async articleCreate(params) {
    return  await Article.create(params)
  }
  // 删除文章
  static async articleDestroy(id) {
    return Article.destroy({where: {id}});
  }
  // 获取所以文章
  static async articlefindAll() {
    return  await Article.findAll({
      order: [
        ['createdAt', 'DESC']
      ]
    });
  }

  // 更新文章
  static async articleUpdate(params,id) {
    return await Article.update(
        params,
        {where: {id}});
  }
  // 查询文章id
  static async articlefindOne(id) {
    return await Article.findOne(
        {where: {id}}
        );
  }
  // 文章分页
  static async  articlefindAndCountAll() {
    return  await await Article.findAndCountAll({
      where:{},
      order: [
        ['createdAt', 'DESC']
      ]
    });
  }
// 根据标签查询文章
  static async  articlefindAndCountAllTag(tag) {
    return  await await Article.findAndCountAll({
      where:{tag},
      order: [
        ['createdAt', 'DESC']
      ]
    });
  }
  // 根据标签查询文章
  static async  articlefindAndCountAllCategory(category) {
    return  await await Article.findAndCountAll({
      where:{category},
      // offset: 1,
      // limit: 5,
      order: [
        ['createdAt', 'DESC']
      ]
    });
  }


}

module.exports = {
  ArticleServices
};

