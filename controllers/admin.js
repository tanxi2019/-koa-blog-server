// controllers 其他逻辑操作
const {AdminServices} = require('../services/admin');
const {encrypt, comparePassword} = require('../utils/bcrypt');
const {createToken} = require('../utils/token');

class Admin {

    static login = async (ctx) => {
        const {username, password} = ctx.request.body;
        const data = await AdminServices.findOneAdmin(username);

        if (!data) {
            ctx.body = {
                code: 400,
                msg: '用户不存在'
            }
        } else {
            const isMatch = await comparePassword(password, data.password);
            if (!isMatch) {
                ctx.body = {
                    code: 400,
                    msg: '密码不正确'
                }
            } else {
                const {id, username, avatar} = data;
                const token = createToken({username: username});
                ctx.body = {
                    code: 1000,
                    token,
                    msg: '登录成功',
                    data: {
                        id,
                        username,
                        avatar
                    }
                }
            }
        }

    };

    static register = async (ctx) => {
        const user = ctx.request.body;
        let saltPassword = await encrypt(user.password);

        if (!user.username) {
            ctx.body = {
                code: 1003,
                msg: '用户名不能为空'
            };
            return false
        }
        try {
            const data = await AdminServices.createAdmin(user.username, saltPassword);
            ctx.body = {
                data,
                code: 1000,
                msg: '创建成功'
            }
        } catch (err) {
            const msg = err.errors[0];
            ctx.body = {
                code: 300,
                msg: msg.value + msg.message
            }
        }
    };

    static logout = async (ctx) => {
        const data = ctx.request.body;
        ctx.body = {
            data,
            code: 1000,
            msg: '退出成功'
        }
    };
    //***query//
    static getInfo = async (ctx) => {
        let {id} = ctx.query;
        //  const {id} = ctx.request.body;
        const data = await AdminServices.getInfoAdmin(id);

        ctx.body = {
            id,
            data: {
                id: data.id,
                username: data.username,
                password: data.password,
                avatar: data.avatar,
                createdAt: data.createdAt,
                updatedAt: data.updatedAt

            },
            code: 1000,
            msg: '获取成功'
        }
    };

    static userList = async (ctx) => {
        const data = await AdminServices.findAllAdmin();
        ctx.body = {
            data,
            code: 1000,
            msg: '获取成功'
        }
    };

    static list = async (ctx) => {
        const {pageNo, pageSize} = ctx.request.body;
        const {rows, count} = await AdminServices.adminfindAndCountAll();

        // 根据分页输出数据
        let start = pageSize * (pageNo - 1);
        let data = rows.slice(start, start + pageSize);

        ctx.body = {
            data,
            total: count,
            code: 1000,
            msg: '获取成功'
        }
    };

    static destroy = async (ctx) => {
        const {id} = ctx.request.body;
        await AdminServices.deleteAdmin(id);
        ctx.body = {
            code: 1000,
            desc: '删除成功'
        }
    };

    static update = async (ctx) => {
        const {id, username, password, avatar} = ctx.request.body;
        let saltPassword = await encrypt(password);
        const data = AdminServices.userUpdate(username, saltPassword, avatar, id);
        ctx.body = {
            data,
            code: 1000,
            desc: '修改成功'
        }
    };


}

module.exports = {
    Admin
};
