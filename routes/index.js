const router = require('koa-router')();

const {Tag} = require('../controllers/tag');
const {Admin} = require('../controllers/admin');
const {Category} = require('../controllers/category');
const {Article} = require('../controllers/article');
const {Picture} = require('../controllers/picture');
const {File} = require('../controllers/file');
const {Link} = require('../controllers/link');
const {Pay} = require('../controllers/pay');

// admin
router.post('/login', Admin.login);
router.post('/register', Admin.register);
router.post('/logout', Admin.logout);
router.get('/users', Admin.userList);
router.get('/getInfo', Admin.getInfo);
router.post('/list', Admin.list);
router.post('/user/delete', Admin.destroy);
router.post('/user/update', Admin.update);




// tag
router.post('/tag/list', Tag.list);
router.get('/tag/list/all', Tag.listAll);
router.post('/tag/create', Tag.create);
router.post('/tag/destroy', Tag.destroy);
router.post('/tag/update', Tag.update);

// category
router.post('/category/list', Category.list);
router.get('/category/list/all', Category.listAll);
router.post('/category/create', Category.create);
router.post('/category/destroy', Category.destroy);
router.post('/category/update', Category.update);


// Article
router.post('/article/list', Article.list);
router.get('/article/list/all', Article.listAll);
router.post('/article/tag', Article.item);
router.post('/article/category', Article.articleCarytage);
router.get('/article/detail', Article.detail);
router.post('/article/like', Article.like);
router.post('/article/create', Article.create);
router.post('/article/update', Article.update);
router.post('/article/destroy', Article.destroy);

// Picture
router.post('/upload', Picture.upload);
router.get('/picture', Picture.getPicture);
router.post('/picture/destroy', Picture.delPicture);
router.post('/picture/update', Picture.updatePicture);
router.post('/picture/list', Picture.list);

// File
// 阿里云
//router.post('/file', File.upload);
// 七牛云token 方式
router.get('/files', File.uploads);
// 七牛云
router.post('/file', File.qiniuUpload);


// Link
router.post('/link/list', Link.list);
router.get('/link/list/all', Link.listAll);
router.post('/link/create', Link.create);
router.post('/link/destroy', Link.destroy);
router.post('/link/update', Link.update);

// pay
router.get('/pay', Pay.alipay);


module.exports = router;
