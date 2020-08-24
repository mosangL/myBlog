const dbutil = require("./dbutil");

function queryCommentsByLimit(limit, success) { //获取最新评论/留言
    let querySql = "select user_name, comments, ctime from comments order by id desc limit ?;";
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

function queryCommentsByBlogId(blog_id, offset, limit, success) {
    let querySql = "select * from comments where blog_id = ? limit ?, ?;";
    let connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, [blog_id, offset*limit, limit], (error, result) => {
        if (error == null) {
            console.log(result);
            success(result);
        } else {
            throw new Error(error);
        }
    });
    connection.end();
}

function queryCommentCountByBlogId(blog_id, success) {
    let querySql = "select count(1) as count from comments where blog_id = ?;";
    let connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, blog_id, (error, result) => {
        if (error == null) {
            // console.log(result);
            success(result);
        } else {
            throw new Error(error);
        }
    });
    connection.end();
}

function insetComment(blog_id, parent, user_name, comments, email, ctime, utime, success){
    let insetSql = "insert into comments (blog_id, parent, user_name, comments, email, ctime, utime) values (?, ?, ?, ?, ?, ?, ?)";
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

module.exports = {
    queryCommentsByBlogId,
    insetComment,
    queryCommentCountByBlogId,
    queryCommentsByLimit
};