const dbutil = require("./dbutil");


function insertTagBlogMapping(tagId, blogId, ctime, utime, success){
    let insetSql = "insert into tag_blog_mapping (tag_id, blog_id, ctime, utime) values (?, ?, ?, ?)";
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
    insertTagBlogMapping,
};