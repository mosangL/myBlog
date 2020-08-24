
const commentDao = require("../dao/commentDao");
const parseParams = require("../util/parseParams");
const timeUtil = require("../util/timeUtil");
const resUtil = require("../util/responseUtil");
const captcha = require("svg-captcha"); // 验证码

let path = new Map();

function queryCommentsByLimit(request, response) {
    request.on('data', data => {
        let dataObj = parseParams(data);
        commentDao.queryCommentsByLimit(+dataObj.limit, result => {
            // console.log(result);
            response.writeHead(200, resUtil.headSet);
            response.write(resUtil.writeResult("success", "查询成功", result));
            response.end();
        })
    })
}
path.set("/queryCommentsByLimit", queryCommentsByLimit);

function queryCommentsByBlogId(request, response) {
    request.on('data', data => {
        let dataObj = parseParams(data);
        let {blog_id, offset, limit} = dataObj;
        commentDao.queryCommentsByBlogId(blog_id, +offset, +limit, result => {
            // console.log(result);
            response.writeHead(200, resUtil.headSet);
            response.write(resUtil.writeResult("success", "查询成功", result));
            response.end();
        })
    })
}
path.set("/queryCommentsByBlogId", queryCommentsByBlogId);

function queryCommentCountByBlogId(request, response) {
    request.on('data', data => {
        let dataObj = parseParams(data);
        commentDao.queryCommentCountByBlogId(dataObj.blog_id, result => {
            // console.log(result);
            response.writeHead(200, resUtil.headSet);
            response.write(resUtil.writeResult("success", "查询成功", result[0]));
            response.end();
        })
    })
}
path.set("/queryCommentCountByBlogId", queryCommentCountByBlogId);

function addComment(request, response) {
    request.on('data', data => {
        let dataObj = parseParams(data);
        let {blog_id, parent, user_name, comments, email} = dataObj;
        commentDao.insetComment(blog_id, parent, user_name, comments, email, timeUtil.getNow(), timeUtil.getNow(), result => {
            response.writeHead(200, resUtil.headSet);
            response.write(resUtil.writeResult("success", "评论成功"));
            response.end();
        });
    })
}

path.set("/addComment", addComment);

// 生成验证码
function queryRandomCode(request, response) {
    let img = captcha.create({fontSize: 50, width: 100, height: 34});
    response.writeHead(200, resUtil.headSet);
    response.write(resUtil.writeResult("success", "获取成功", img));
    response.end();
}
path.set("/queryRandomCode", queryRandomCode);

module.exports.path = path;