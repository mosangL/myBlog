const blogDao = require("../dao/blogDao");
const tagsDao = require("../dao/tagsDao");
const tagBlogMappingDao = require("../dao/tagBlogMappingDao");
const parseParams = require("../util/parseParams");
const timeUtil = require("../util/timeUtil");
const resUtil = require("../util/responseUtil");
const url = require("url");

let path = new Map();
function queryBlogById(request, response) {
    request.on('data', data => {
        let dataObj = parseParams(data);
        blogDao.queryBlogById(+dataObj.id, result => {
            // console.log(result);
            response.writeHead(200, resUtil.headSet);
            response.write(resUtil.writeResult("success", "查询成功", result[0]));
            response.end();
        })
    })
}
path.set("/queryBlogById", queryBlogById);

function queryBlogCount(request, response) {
    blogDao.queryBlogCount(result => {
        // console.log(result);
        response.writeHead(200, resUtil.headSet);
        response.write(resUtil.writeResult("success", "查询成功", result[0]));
        response.end();
    })
}
path.set("/queryBlogCount", queryBlogCount);

function queryBlogByPage(request, response) {
    request.on('data', data => {
        let dataObj = parseParams(data);
        blogDao.queryBlogByPage(+dataObj.page, +dataObj.limit, result => {
            // console.log(result);
            response.writeHead(200, resUtil.headSet);
            response.write(resUtil.writeResult("success", "查询成功", result));
            response.end();
        })
    })
}
path.set("/queryBlogByPage", queryBlogByPage);

function editBlog(request, response) {
    request.on('data', data => {
        console.log(decodeURIComponent(data.toString()));
        let dataObj = parseParams(decodeURIComponent(data.toString()));
        let {title, content, tags} = dataObj;
        console.log(dataObj);
        tags = tags.replace(/ /g, "").replace("，", ",");
        if (dataObj.pw == '1234567') {
            blogDao.insetBlog(title, content, 1, tags, timeUtil.getNow(), timeUtil.getNow(), result => {
                response.writeHead(200, resUtil.headSet);
                response.write(resUtil.writeResult("success", "添加成功"));
                response.end();
                //添加标签tags
                let blogId = result.insertId;
                let tagList = tags.split(",");
                tagList.forEach(ele => {
                    if (ele){
                        queryTag(ele, blogId);
                    }
                })
            });
        } else {
            response.writeHead(200, resUtil.headSet);
            response.write(resUtil.writeResult("fail", "验证码不对，请重新确认。"));
            response.end();
        }

    })
}

function queryTag(tag, blogId) {
    tagsDao.queryTag(tag, result => {
        if (result && result.length) {
            insertTagBlogMapping(result[0].id, blogId)
        } else {
            insertTag(tag, blogId);
        }
    })
}

function insertTag(tag, blogId) {
    tagsDao.insetTag(tag, timeUtil.getNow(), timeUtil.getNow(),result => {
        if (result) {
            console.log(tag + "插入tags表中");
            //把tags和blogId映射到表中
            insertTagBlogMapping(result.insertId, blogId);
        }
    })
}

function insertTagBlogMapping(tagId, blogId){
    tagBlogMappingDao.insertTagBlogMapping(tagId, blogId, timeUtil.getNow(), timeUtil.getNow(), result => {
        console.log(tagId, blogId, "映射成功")
    })
}

path.set("/editBlog", editBlog);

// 热门博客
function queryBlogByViews(request, response) {
    request.on('data', data => {
        let dataObj = parseParams(data);
        blogDao.queryBlogByViews(+dataObj.limit, result => {
            // console.log(result);
            response.writeHead(200, resUtil.headSet);
            response.write(resUtil.writeResult("success", "查询成功", result));
            response.end();
        })
    })
}
path.set("/queryBlogByViews", queryBlogByViews);

// 更新博客浏览次数
function updateBlogViews(request, response) {
    request.on('data', data => {
        let dataObj = parseParams(data);
        let {blog_id, views} = dataObj;
        blogDao.updateBlogViews(+blog_id, +views, result => {
            response.writeHead(200, resUtil.headSet);
            response.write(resUtil.writeResult("success", "更新成功", result));
            response.end();
        })
    })
}
path.set("/updateBlogViews", updateBlogViews);

function queryAllBlog(request, response) {
    let params = url.parse(request.url, true).query;
    blogDao.queryAllBlog(params.tag.trim(), result => {
        response.writeHead(200, resUtil.headSet);
        response.write(resUtil.writeResult("success", "查询成功", result));
        response.end();
    })
}
path.set("/queryAllBlog", queryAllBlog);

// 热门博客
function queryBlogByKeyWord(request, response) {
    request.on('data', data => {
        let dataObj = parseParams(data);
        blogDao.queryBlogByKeyWord(dataObj.keyWords, result => {
            // console.log(result);
            response.writeHead(200, resUtil.headSet);
            response.write(resUtil.writeResult("success", "查询成功", result));
            response.end();
        })
    })
}
path.set("/queryBlogByKeyWord", queryBlogByKeyWord);

module.exports.path = path;