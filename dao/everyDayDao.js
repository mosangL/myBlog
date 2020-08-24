const dbutil = require("./dbutil");

function queryEveryDay(success) {
    let querySql = "select * from every_day order by id desc limit 1;";
    let connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, (error, result) => {
        if (error == null) {
            // console.log(result);
            success(result);
        } else {
            throw new Error(error);
        }
    });
    connection.end();
}

function insetEveryDay(content, ctime, success){
    let insetSql = "insert into every_day (content, ctime) values (?, ?)";
    let connection = dbutil.createConnection();
    connection.connect();
    connection.query(insetSql, [content, ctime], (error, result) => {
        if (error == null) {
            success(result);
        } else {
            throw new Error(error);
        }
    });
    connection.end();
}

module.exports = {
    queryEveryDay,
    insetEveryDay,
};