const tagsDao = require("../dao/tagsDao");
const parseParams = require("../util/parseParams");
// const timeUtil = require("../util/timeUtil");
const resUtil = require("../util/responseUtil");

let path = new Map();

function queryTagCloud(request, response) {
    request.on('data', data => {
        let dataObj = parseParams(data);
        tagsDao.queryTagCloud(+dataObj.num, result => {
            response.writeHead(200, resUtil.headSet);
            response.write(resUtil.writeResult("success", "请求成功", result));
            response.end();
        })
    })
}
path.set("/queryTagCloud", queryTagCloud);


module.exports.path = path;