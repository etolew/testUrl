var batch = { maxCount: 3000 };
function autoSize() {
    var h = document.documentElement.clientHeight < document.body.clientHeight ? document.body.clientHeight : document.documentElement.clientHeight;
    h = (h - 101) + "px";
    document.getElementById("nav").style.height = h;
    document.getElementById("vsep").style.height = h;
}

function customizeInit() {
    window.onload = cusIni;
    //    document.getElementById("create").onclick = function() {
    //        if (check())
    //            document.forms[0].submit();
    //    }
}

function batchInit() {
    document.getElementById("create").onclick = function() {
        if (batchCheck())
            document.forms[0].submit();
    }
}

function validateSuffix(suffix, tipId) {
    var patt = new RegExp(/^[a-zA-Z0-9]{1,8}$/);
    var tip = document.getElementById(tipId);

    if (suffix == "") {
        tip.style.color = "";
        tip.innerHTML = "请输入要生成的短地址,长度1-8位, 由字母和数字组成,区分大小写";
        return false;
    }

    if (patt.test(suffix)) {
        tip.style.color = "";
        tip.innerHTML = "";
        return true;
    } else {
        tip.style.color = "#B82223";
        tip.innerHTML = "目标短地址长度必须是1-8位,由数字和字母组成,区分大小写";
        return false
    }
}

function cusIni() {
    document.getElementById("target").onchange = function() {
        validateSuffix(this.value, "tip");
    }
}

//自定义短地址提交
function check() {
    var rawurl = document.forms[0].rawurl.value;
    var tip = document.getElementById("tip");
    if (rawurl == null || rawurl == "") {
        tip.innerHTML = "请输入源地址";
        document.forms[0].rawurl.focus();
        return false;
    }

    var target = document.forms[0].target.value;
    if (target == null || target == "") {
        tip.innerHTML = "请输入要生成的短地址,长度1-8位, 由字母和数字组成,区分大小写";
        document.forms[0].target.focus();
        return false;
    }

    return validateSuffix(target, "tip");
}

//批量提交
function batchCheck() {
    var urls = document.forms[0].rawurls.value;
    var tip = document.getElementById("tip");
    if (urls == null || urls == "") {
        tip.innerHTML = "请输入要缩短的网址, 以\";\"或者换行分隔, 不能超过" + batch.maxCount + "条";
        document.forms[0].rawurls.focus();
        return false;
    }
    return checkCount(urls);
}

function checkCount(rawUrl) {
    var tip = document.getElementById("tip");
    if (rawUrl == null || rawUrl == "") {
        tip.innerHTML = "请输入要缩短的网址, 以\";\"或者换行分隔, 不能超过" + batch.maxCount + "条";
        return;
    }

    rawUrl = rawUrl.replace(/\n/g, ";");
    var urls = rawUrl.split(';');
    var count = 0;
    for (i in urls) {
        if (urls[i] != null && urls[i] != "")
            count++;
    }
    if (count > batch.maxCount) {
        tip.innerHTML = "要生成的网址超过" + batch.maxCount + "条了";
        document.forms[0].rawurls.focus();
        return false;
    } else {
        tip.innerHTML = "&nbsp;";
        return true;
    }
}

function emptyBat() {
    document.getElementById("rawurls").value = "";
    document.getElementById("rawurls").focus();
    document.getElementById("tip").innerHTML = "请输入要缩短的网址, 以\";\"或者换行分隔, 不能超过" + batch.maxCount + "条";
}

function ShowDiv() {
    var selSchema = document.getElementsByName("ctl00$content$selSchema")[0];
    var sourceUrlDiv = document.getElementById("sourceUrlDiv");
    var paramDiv = document.getElementById("paramDiv");
    sourceUrlDiv.className = "hiddenDiv";
    paramDiv.className = "hiddenDiv";
    if (selSchema.value == "0") {
        sourceUrlDiv.className = "showDiv";
    }
    else {
        paramDiv.className = "showDiv";
    }
}

function MessageShow(sourceUrl) {    
    var sUserAgent = navigator.userAgent.toLowerCase();
    var micromsg_android = document.getElementById("micromsg_android");
    var micromsg_ios = document.getElementById("micromsg_ios");
    var messageDiv = document.getElementById("MessageDiv");
    var mircromsg_download = document.getElementById("mircromsg_download");
    var errMsgDiv = document.getElementById("ErrMsgDiv");
    var iphoneDiv = document.getElementById("IphoneDownload");
    var androidDiv = document.getElementById("AndroidDownload");
    micromsg_android.className = "hiddenDiv";
    micromsg_ios.className = "hiddenDiv";
    mircromsg_download.className = "hiddenDiv";
    if (sourceUrl != "" && sourceUrl != undefined) {
        errMsgDiv.className = "hiddenDiv";
        if (sUserAgent.indexOf("micromessenger") != -1) {
            messageDiv.className = "hiddenDiv";
            mircromsg_download.className = "showDiv";
            if (sUserAgent.match(/iphone os/i) == "iphone os") {
                micromsg_ios.className = "showDiv";
            }
            else if (sUserAgent.match(/android/i) == "android") {
                micromsg_android.className = "showDiv";
            }
        }
        else {
            micromsg_android.className = "hiddenDiv";
            micromsg_ios.className = "hiddenDiv";
            iphoneDiv.className = "showDiv";
            androidDiv.className = "showDiv";
            if (sUserAgent.indexOf("mpbank") != -1) {              
                messageDiv.className = "hiddenDiv";
            }
            if (sUserAgent.match(/iphone os/i) == "iphone os") {
                androidDiv.className = "hiddenDiv";
            }
            else if (sUserAgent.match(/android/i) == "android") {
                iphoneDiv.className = "hiddenDiv";
            }
        }
    }
    else {
        messageDiv.className = "hiddenDiv";
    }
}

