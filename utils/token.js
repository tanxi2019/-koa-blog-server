const { TOKEN_SECRET, TOKEN_EXPIRESIN } = require('../config/secrt');
const jwt = require('jsonwebtoken');

exports.createToken = info => {
    //console.log('generated token', token);
    return jwt.sign(info, TOKEN_SECRET, {expiresIn: TOKEN_EXPIRESIN})
};

const decodeToken = ctx => {
    const authorizationHeader = ctx.headers['authorization'];
    const token = authorizationHeader.split(' ')[1]; // 取到 token
    return jwt.decode(token)
};

exports.decodeToken = decodeToken;

// 检查权限 权限 1 为博主~
exports.checkAuth = ctx => {
    const { auth } = decodeToken(ctx);
    if (auth === 1) {
        return true
    } else {
        ctx.body = { code: 401, message: '您无权限进行此操作' };
        return false
    }
};
