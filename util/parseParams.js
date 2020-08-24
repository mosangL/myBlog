// eg: data = "a=1&b=2"
module.exports = (data) => {
    let dataObj = {};

    if (typeof data == "object") {
        data = data.toString();
    }

    if (data.startsWith("blog_container=")) { //编辑博客
        dataObj.content = data.split("blog_container=")[1].split("&blog_pw=")[0];

        data = "pw=" + data.split("&blog_pw=")[1];
    }

    data.split("&").forEach(ele => {
        if (ele) {
            let key = ele.split("=", 1)[0];
            dataObj[key] = ele.split(key + "=", 2)[1];
        }
    });
    return dataObj;
};