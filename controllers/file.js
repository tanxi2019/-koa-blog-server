const fs = require('fs');
const path = require('path');
const qiniu = require("qiniu");
const {qiNiiuYun, config} = require("../utils/qiniu");
const {client} = require('../utils/oss');

class File {

    static upload = async (ctx) => {  // 上传多个文件
        const file = ctx.request.files.file; // 获取上传文件
        const reader = fs.createReadStream(file.path);
        // 本地上传
        // const filePath = path.resolve(`public/upload/${file.name}`);
        // const upStream = fs.createWriteStream(filePath);  // 创建可写流
        // reader.pipe(upStream); // 可读流通过管道写入可写流
        let path = `/images/${Date.parse(new Date())}${file.name}`;
        let data = await client.putStream(path, reader);
        ctx.body = {
            data,
            code: 1000,
            msg: '上传成功'
        };
    };

    static uploads = async (ctx) => {  // 上传多个文件
        let mac = new qiniu.auth.digest.Mac(config.accessKey, config.secretKey);
        //要上传的空间
        let options = {
            scope: config.bucket
        };
        // 构建上传凭证
        let putPolicy = new qiniu.rs.PutPolicy(options);
        // 生成token
        let uploadToken = putPolicy.uploadToken(mac);


        ctx.body = {
            uploadToken,
            code: 1000,
            msg: '上传成功'
        };
    };

    static qiniuUpload = async (ctx) => {
        const file = ctx.request.files.file;
        let fileName = `/images/${Date.parse(new Date())}${file.name}`;
        const fillPath = fs.createReadStream(file.path);
        qiNiiuYun.upload(fillPath, {key: fileName}, function (err, result) {});
        let origin = 'http://cdn.cssjs.club';
        ctx.body = {
            data:{
                name:fileName,
                url:`${origin}${fileName}`
            },
            code: 1000,
            msg: '上传成功'
        };
    };
}

module.exports = {
    File
};
