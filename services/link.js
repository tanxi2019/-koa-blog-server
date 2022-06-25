const Link = require('../model/link');

class LinkServices{
  // 创建友情链接
  static async linkCreate(params) {
    return  await Link.create(params)
  }
  // 删除友情链接
  static async linkDestroy(id) {
    return Link.destroy({where: {id}});
  }
  // 友情链接列表
  static async linkfindAll() {
    return  await Link.findAll();
  }
  // 更新友情链接
  static async linkUpdate(name,link,id) {
    return await Link.update(
        {name,link},
        {where: {id}});
  }
  // 友情链接分页
  static async  linkfindAndCountAll() {
    return  await await Link.findAndCountAll({
      where:{},
      order: [
        ['createdAt', 'DESC']
      ]
    });
  }
}

module.exports = {
  LinkServices
};
