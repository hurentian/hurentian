// javascript:(function(){const sa=document.createElement("script");sa.src='https://fastly.jsdelivr.net/gh/hurentian/hurentian/ys.js?v1';document.body.append(sa)})();

getLink = function () {
    var cookie = document.cookie;

    var login_ticket = cookie.match('login_ticket=([0-9a-zA-Z]+)');
    if (login_ticket == null) {
        alert('登录失效，请重新登录')
        return
    }
    login_ticket = login_ticket[0].split("=")[1];

    var uid = cookie.match('ltuid=([0-9]+)');
    if (uid == null) {
        uid = cookie.match('login_uid=([0-9]+)');
    }
    uid = uid[0].split("=")[1];

    if (login_ticket == null || uid == null) {
        alert('获取失败')
        return
    }

    var token_url = 'https://genshinachapage-api-kpcdkbwnah.cn-chengdu.fcapp.run?c=login_uid=' + uid + ';login_ticket=' + login_ticket;
    fetch(token_url).then((res) => res.text()).then(ret => {
        // console.log(ret)
        if (!ret.trim()) {
            console.log("链接转换异常", ret);
            alert('链接转换异常，请重试！\n如果出现多次此提示，请短时间内不要重复运行！');
        } else {
            location.href = ret;
        }
    }, err => {
        console.error("ret err===", err);
    })
}

if (window.location.host.endsWith('user.mihoyo.com')) {
    getLink()
} else {
    var html_all = document.documentElement.innerHTML

    if (html_all.length > 100) {
        if (window.confirm('需要在米哈游通行证页面执行,是否跳转到米哈游通行证页面?')) {
            document.location.href = "https://user.mihoyo.com/#/login/captcha"
        }
    } else {
        document.location.href = "https://user.mihoyo.com/#/login/captcha"
    }
}
