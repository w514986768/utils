/*
 * 判断浏览器类型
 * @returns {obj}
 */
function getBrowser() {
    var UA = {};
    var ua = navigator.userAgent.toLowerCase(),s;
    UA.ie = (s = ua.match(/(msie\s|trident.*rv:)([\d.]+)/))? parseInt(s[2]):false;
    UA.firefox = (s =ua.match(/firefox\/([\d.]+)/))? parseInt(s[1]):false;
    UA.chrome = (s = ua.match(/chrome\/([\d.]+)/))?parseInt(s[1]):false;
    UA.opera = (s = ua.match(/opera.([\d.]+)/))?parseInt(s[1]):false;
    UA.safari = (s = ua.match(/version\/([\d.]+).*safari/))?parseInt(s[1]):false;
    UA.android = (s=ua.match(/android/))?s:false;
    UA.iphone = (s=ua.match(/iphone os/))?s:false;
    UA.ipad = (s=ua.match(/ipad/))?s:false;
    UA.ios = UA.ipad || UA.iphone;
    UA.isWin32 = /win32/i.test(window.navigator.platform);
    UA.isWeixin = (s=ua.match(/MicroMessenger/i))?!!s:false; //判断是否是在微信浏览器里面
    UA.isUcweb = (s=ua.match(/ucbrowser/))?!!s:false;
    UA.isMqq = (s=ua.match(/mqqbrowser/))?!!s:false; //是否是手机qq浏览器
    UA.isWeiBo = (s=ua.match(/__weibo__/))?!!s:false; //是否微博浏览器
    return  UA;
}

/*
 * 获取URL参数
 * @param name
 * @returns {string}
 */
function GetQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}

/*
 * 当前时间格式转成字符串
 * @param fmt 传入日期格式 例如yyyy-mm-dd
 * @returns {string}
 */
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

/**
 * 判断字符串是否为空
 * @param str
 * @returns {Boolean}
 */
function isEmpty(str){
    if(str != null && str.length > 0) {
        return true;
    }
    return false;
}

/**
 * 判断是否是数字
 * @param value
 * @returns {Boolean}
 */
function isNum(value) {
    if (value != null && value.length > 0 && isNaN(value) == false) {
        return true;
    }
    else {
        return false;
    }
}

/*
 * 判断是否是中文
 * @param str
 * @returns {Boolean}
 */
function isChinese(str){
    var reg = /^([u4E00-u9FA5]|[uFE30-uFFA0])*$/;
    if(reg.test(str)){
        return false;
    }
    return true;
}

/*
 * 下载指定文本
 * @param fileName 文件名
 * @param textCtx 文件内容
 *
 * */
function downloadText (fileName, textCtx) {
    var aTag, ifr;

    if (fileName && textCtx) {
        if (!~navigator.userAgent.indexOf('MSIE')) {
            aTag = document.createElement('a');
            aTag.setAttribute('href', 'data:text/plain,' + textCtx);
            aTag.setAttribute('download',  fileName);
            aTag.click();
        } else {
            ifr = document.createElement('iframe');
            ifr.style.display = 'none';
            document.body.appendChild(ifr);
            ifr.contentWindow(textCtx);
            ifr.contentWindow.document.execCommand('SaveAs', false, fileName);
            document.body.removeChild(ifr);
        }
    }
}