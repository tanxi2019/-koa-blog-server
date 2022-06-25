const Koa = require('koa');
const app = new Koa();
const json = require('koa-json');
const onerror = require('koa-onerror');
const logger = require('koa-logger');
const Static = require('koa-static');
const cors = require('koa2-cors');
const router = require('./routes');
const koaBody = require('koa-body');
const sequelize = require('./config/db');


app.use(cors());
sequelize
    .authenticate()
    .then(() => {
        console.log('MYSQL 连接成功......');
    })
    .catch(err => {
        console.error('链接失败:', err);
    });
// 根据模型自动创建表
//sequelize.sync();

app.use(Static(__dirname + '/public/'));

app.use(koaBody({
    multipart: true,
    strict: false,
}));

app.use(json());
app.use(logger());
app.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
});

// routes
app.use(router.routes(), router.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error：', err, ctx)
});

// error
onerror(app);

module.exports = app;
