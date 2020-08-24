const everyDayDao = require("../dao/everyDayDao");
const parseParams = require("../util/parseParams");
const timeUtil = require("../util/timeUtil");
const resUtil = require("../util/responseUtil");

let path = new Map();

function editEveryDay(request, response) {
    request.on('data', data => {
        let dataObj = parseParams(data);
        if (dataObj.pw == '1234567') {
            everyDayDao.insetEveryDay(dataObj.content, timeUtil.getNow(), result => {
                response.writeHead(200, resUtil.headSet);
                response.write(resUtil.writeResult("success", "添加成功"));
                response.end();
            });
        } else {
            response.writeHead(200, resUtil.headSet);
            response.write(resUtil.writeResult("fail", "验证码不对，请重新确认。"));
            response.end();
        }

    })
}
path.set("/editEveryDay", editEveryDay);

function queryEveryDay(request, response) {
    everyDayDao.queryEveryDay(result => {
        response.writeHead(200, resUtil.headSet);
        response.write(resUtil.writeResult("success", "请求成功", result));
        response.end();
    })

}
path.set("/queryEveryDay", queryEveryDay);


module.exports.path = path;