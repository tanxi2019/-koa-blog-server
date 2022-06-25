const {PictureServices} = require('../services/picture');

class Picture{

    static upload = async (ctx) => {  // 上传多个文件
        const params = ctx.request.body;
        if (!params.name) {
            ctx.body = {
                code: 1003,
                msg: '标签不能为空'
            };
            return false
        }
        try {
            const data = await PictureServices.pictureCreate(params);
            ctx.body = {
                data,
                code: 1000,
                msg: '创建成功'
            }
        }
        catch(err) {
            const msg = err.errors[0];
            ctx.body = {
                code: 300,
                msg: msg.value + msg.message
            }
        }
    };

    static getPicture = async (ctx) =>{
        const data = await PictureServices.picturefindAll();
        ctx.body = {
            code: 1000,
            data,
            msg:'获取成功'
        }
    };

    static delPicture = async (ctx) => {
        const {id} = ctx.request.body;
        await PictureServices.pictureDestroy(id);
        ctx.body = {
            code: 1000,
            msg: '删除成功'
        }
    };

    static updatePicture = async (ctx) =>  {
        const params = ctx.request.body;
        const data = await PictureServices.pictureUpdate(params,params.id);
        ctx.body = {
            data,
            code: 1000,
            msg: '修改成功'
        }
    };

    static list = async (ctx) => {
        const {pageNo, pageSize} = ctx.request.body;
        const {rows, count } = await PictureServices.picturefindAndCountAll();
        // 根据分页输出数据
        let start = pageSize * (pageNo - 1);
        let data = rows.slice(start, start + pageSize);
        ctx.body = {
            data,
            total:count,
            code: 1000,
            msg:'获取成功'
        }
    };

}

module.exports = {
    Picture
};
