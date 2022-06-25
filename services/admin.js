// services 数据库操作抽离
const Admin = require('../model/admin');

class AdminServices {
    //创建用户
    static async createAdmin(username, password) {
        return await Admin.create({
            username,
            password
        });
    }

    //用户登录
    static async findOneAdmin(username) {
        return await Admin.findOne({
            where: {username}
        });
    }

    // 获取用户列表
    static async findAllAdmin() {
        return await Admin.findAll();
    }

    // 获取用户信息
    static async getInfoAdmin(id) {
        return await Admin.findOne({
            where: {id}
        });
    }

    // 删除用户
    static async deleteAdmin(id) {
        return Admin.destroy({where: {id}});
    }

    // 更新用户
    static async userUpdate(username, password, avatar, id) {
        return await Admin.update(
            {username, password, avatar},
            {where: {id}});
    }

    // 用户分页
    static async adminfindAndCountAll() {
        return await await Admin.findAndCountAll({
            where: {},
            order: [
                ['createdAt', 'DESC']
            ]
        });
    }

}

module.exports = {
    AdminServices
};
