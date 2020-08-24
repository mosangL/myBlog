const dbutil = require("./dbutil");

function queryTag(tag, success) {
    let querySql = "select * from tags where tag = ?;";
    let connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, tag, (error, result) => {
        if (error == null) {
            console.log(result);
            success(result);
        } else {
            throw new Error(error);
        }
    });
    connection.end();
}

function queryTagCloud(num, success) {
    let querySql = "select id, tag from tags limit ?;";
    let connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, num,(error, result) => {
        if (error == null) {
            console.log(result);
            success(result);
        } else {
            throw new Error(error);
        }
    });
    connection.end();
}


function insetTag(tag, ctime, utime, success){
    let insetSql = "insert into tags (tag, ctime, utime) values (?, ?, ?)";
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
    queryTag,
    insetTag,
    queryTagCloud
};