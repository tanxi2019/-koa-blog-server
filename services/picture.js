const Picture = require('../model/picture');

class PictureServices{
    // 创建图片
    static async pictureCreate(params) {
        return  await Picture.create(params)
    }
    // 删除图片
    static async pictureDestroy(id) {
        return Picture.destroy({where: {id}});
    }
    // 图片列表
    static async picturefindAll() {
        return  await Picture.findAll();
    }
    // 更新图片
    static async pictureUpdate(params,id) {
        return await Picture.update(
            params,
            {where: {id}});
    }
    // 查询图片id
    static async picturefindOne(id) {
        return await Picture.findOne(
            {where: {id}});
    }
    // 图片分页
    static async  picturefindAndCountAll() {
        return  await await Picture.findAndCountAll({
            where:{},
            order: [
                ['createdAt', 'DESC']
            ]
        });
    }
}

module.exports = {
    PictureServices
};
