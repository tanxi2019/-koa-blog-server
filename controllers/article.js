const {ArticleServices} = require('../services/article');

class Article {
    // 根据标签查询文章
    static item = async ctx => {
        const {tag, pageNo, pageSize} = ctx.request.body;
        const {rows, count} = await ArticleServices.articlefindAndCountAllTag(tag);
        // 根据分页输出数据
        let start = pageSize * (pageNo - 1);
        let data = rows.slice(start, start + pageSize);
        ctx.body = {
            code: 1000,
            tag,
            data,
            total: count,
            msg: '获取成功'
        }
    };
    // 根据分类查询文章
    static articleCarytage = async ctx => {
        const {category, pageNo, pageSize} = ctx.request.body;
       // console.log(ctx.request.body);
        const {rows, count} = await await ArticleServices.articlefindAndCountAllCategory(category);

        // 根据分页输出数据
        let limit = pageSize * (pageNo - 1);
        let data = rows.slice(limit, limit + pageSize);
        ctx.body = {
            code: 1000,
            category,
            data,
            total: count,
            msg: '获取成功'
        }
    };
    // 文章点赞
    static like = async ctx => {
        let {id} = ctx.request.body;
        let {like} = await ArticleServices.articlefindOne(id);
        like++;
        await ArticleServices.articleUpdate({like}, id);
        const data = await await ArticleServices.articlefindOne(id);
        data.tag = data.tag.split(',');
        data.category = data.category.split(',');
        ctx.body = {
            code: 1000,
            data,
            msg: '获取成功'
        }
    };
    // 文章详情
    static detail = async ctx => {
        let {id} = ctx.query;
        let {readedCount} = await ArticleServices.articlefindOne(id);
        readedCount++;
        await ArticleServices.articleUpdate({readedCount}, id);
        const data = await await ArticleServices.articlefindOne(id);
        data.tag = data.tag.split(',');
        data.category = data.category.split(',');
        ctx.body = {
            code: 1000,
            data,
            msg: '获取成功'
        }
    };
    // 文章分页
    static list = async (ctx) => {
        const {pageNo, pageSize} = ctx.request.body;
        const {rows, count} = await ArticleServices.articlefindAndCountAll();

        // 根据分页输出数据
        let start = pageSize * (pageNo - 1);
        let data = rows.slice(start, start + pageSize);

        data.forEach(v => {
            v.tag = v.tag.split(',');
            v.category = v.category.split(',')
        });

        ctx.body = {
            data,
            total: count,
            code: 1000,
            msg: '获取成功'
        }
    };
    // 查询全部文章
    static listAll = async (ctx) => {
        const data = await ArticleServices.articlefindAll();
        ctx.body = {
            code: 1000,
            data,
            msg: '获取成功'
        }
    };
    // 修改文章
    static update = async ctx => {
        const params = ctx.request.body;
        const data = ArticleServices.articleUpdate(params, params.id);
        ctx.body = {
            code: 1000,
            data,
            msg: '修改成功'
        }
    };
    // 创建文章
    static create = async ctx => {
        const params = ctx.request.body;
        console.log(params);
        if (!params.title) {
            ctx.body = {
                code: 1003,
                msg: '标题不能为空'
            };
            return false
        }
        try {
            await ArticleServices.articleCreate(params);
            ctx.body = {
                code: 1000,
                data: '创建成功'
            }
        } catch (err) {
            console.log(err);
            const msg = err.errors[0];
            ctx.body = {
                code: 300,
                data: msg.value + msg.message
            }
        }
    };
    // 删除文章
    static destroy = async ctx => {
        const {id} = ctx.request.body;
        await ArticleServices.articleDestroy(id);
        ctx.body = {
            code: 1000,
            msg: '删除成功'
        }
    };

}


module.exports = {
    Article
};
