const dbutil = require("./dbutil");

function queryBlogCount(success) {
    let querySql = "select count(1) as count from blog;";
    let connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, [], (error, result) => {
        if (error == null) {
            // console.log(result);
            success(result);
        } else {
            throw new Error(error);
        }
    });
    connection.end();
}

function queryBlogByPage(page, limit, success) {
    let querySql = "select * from blog order by id desc limit ?, ?;";
    let connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, [page*limit, limit], (error, result) => {
        if (error == null) {
            // console.log(result);
            success(result);
        } else {
            throw new Error(error);
        }
    });
    connection.end();
}

function queryBlogByViews(limit, success) { //热门博客
    let querySql = "select id, title from blog order by views desc limit ?;";
    let connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, limit, (error, result) => {
        if (error == null) {
            // console.log(result);
            success(result);
        } else {
            throw new Error(error);
        }
    });
    connection.end();
}

function queryBlogByKeyWord(keyWords, success) { //关键字搜索
    let querySql = keyWords? "select * from blog where title like '%" + keyWords + "%' or content like '%" + keyWords + "%';" : "select * from blog order by id desc limit 3;";
    let connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, '', (error, result) => {
        if (error == null) {
            success(result);
        } else {
            throw new Error(error);
        }
    });
    connection.end();
}

function queryBlogById(id, success) {
    let querySql = "select * from blog where id = ?;";
    let connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, id, (error, result) => {
        if (error == null) {
            success(result);
        } else {
            throw new Error(error);
        }
    });
    connection.end();
}

function queryAllBlog(tagName, success) {
    let querySql;
    if (tagName) {
        querySql = "select * from blog where tags like '%" + tagName + "%';";
    } else {
        querySql = "select * from blog order by id desc;";
    }
    // console.log(querySql);

    let connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, "", (error, result) => {
        if (error == null) {
            success(result);
        } else {
            throw new Error(error);
        }
    });
    connection.end();
}

function insetBlog(title, content, views, tags, ctime, utime, success){
    let insetSql = "insert into blog (title, content, views, tags, ctime, utime) values (?, ?, ?, ?, ?, ?)";
    let connection = dbutil.createConnection();
    connection.connect();
    connection.query(insetSql, Array.from(arguments).slice(0, -1), (error, result) => {
        if (error == null) {
            success(result);
        } else {
            throw new Error(error);
        }
    });
    connection.end();
}

//更新博客浏览数量
//UPDATE student SET age = 25, num = 201203 WHERE name = "tom";
function updateBlogViews(blog_id, views, success){
    let insetSql = "update blog set views = ? where id = ?";
    let connection = dbutil.createConnection();
    connection.connect();
    connection.query(insetSql, [views, blog_id], (error, result) => {
        if (error == null) {
            success(result);
        } else {
            throw new Error(error);
        }
    });
    connection.end();
}

module.exports = {
    queryBlogByPage,
    insetBlog,
    queryBlogCount,
    queryBlogById,
    queryBlogByViews,
    updateBlogViews,
    queryAllBlog,
    queryBlogByKeyWord
};