// 阿里云配置
const OSS = require('ali-oss');

let client = new OSS({
    region: 'oss-cn-beijing',
    accessKeyId: 'LTAI4GBZ9C4z7LqcxaQFjg7n',
    accessKeySecret: 'gNiOIZlHtqSaWJDg3cQsp79AFKAC96',
    bucket: 'koa--blog'
});

module.exports = {
    client
};
