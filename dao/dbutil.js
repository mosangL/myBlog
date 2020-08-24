// npm install mysql -D
const mysql = require("mysql");

//连接数据库
function createConnection(){
    return mysql.createConnection({
        host: "localhost",
        port: "3306",
        user: "myblog",
        password: "myblog",
        database: "myblog"
    });
}
module.exports.createConnection = createConnection;




