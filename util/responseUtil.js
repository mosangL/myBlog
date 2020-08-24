function writeResult(status, msg, data=null) {
    return JSON.stringify({
        status: status,
        msg: msg,
        data: data
    })
}

module.exports.writeResult = writeResult;
module.exports.headSet = {
    "Content-Type": "text/html; charset=utf-8",
    "Access-Control-Allow-Origin": "*"
};