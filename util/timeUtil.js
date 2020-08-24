function getNow() {
    return parseInt(Date.now() / 1000);  //时间戳，单位秒
}

module.exports.getNow = getNow;