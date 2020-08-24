let fs = require("fs");
let global_conf = require("./config");

let controllerSet = [];
let pathMap = new Map();

if (!global_conf['web_path']) {
    throw Error("配置文件异常，缺少：web_path")
}

let files = fs.readdirSync(global_conf['web_path']);

files.forEach(ele => {
    const temp = require('./' + global_conf['web_path'] + ele);
    if (temp['path']) {
        for (let [k ,v] of temp.path){
            if (!pathMap.get(k)){
                pathMap.set(k, v)
            } else {
                throw Error(`url path异常，url:${k}`)
            }
        }
        controllerSet.push(temp)
    }

});

// console.log(pathMap);
module.exports = pathMap;