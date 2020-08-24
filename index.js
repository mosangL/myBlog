const express = require("express");
const globalConfig = require("./config");
const loader = require("./loader");

let app = new express();

app.use(express.static("./page/"));

app.post("/editEveryDay", loader.get("/editEveryDay"));
app.post("/queryEveryDay", loader.get("/queryEveryDay"));
app.post("/editBlog", loader.get("/editBlog"));
app.post("/queryBlogByPage", loader.get("/queryBlogByPage"));
app.post("/queryBlogCount", loader.get("/queryBlogCount"));
app.post("/queryBlogById", loader.get("/queryBlogById"));
app.post("/addComment", loader.get("/addComment"));
app.post("/queryRandomCode", loader.get("/queryRandomCode")); //生成验证码
app.post("/queryCommentsByBlogId", loader.get("/queryCommentsByBlogId"));
app.post("/queryCommentCountByBlogId", loader.get("/queryCommentCountByBlogId"));
app.post("/queryTagCloud", loader.get("/queryTagCloud")); // 获取标签云
app.post("/queryCommentsByLimit", loader.get("/queryCommentsByLimit")); //最新评论/留言
app.post("/queryBlogByViews", loader.get("/queryBlogByViews"));//最近热门博客
app.post("/updateBlogViews", loader.get("/updateBlogViews"));//更新博客浏览次数
app.get("/queryAllBlog", loader.get("/queryAllBlog"));
app.post("/queryBlogByKeyWord", loader.get("/queryBlogByKeyWord"));//关键字搜索博客


app.listen(globalConfig.port, function () {
    console.log("server is running in " + globalConfig.port)
});

