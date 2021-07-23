$.ajaxPrefilter(function (option) {
    // console.log(option.url)
    // 在发起Ajax请求之前统一的设置以恶搞路径
    option.url = "http://api-breakingnews-web.itheima.net" + option.url
    // console.log(option.url)
    // 在发起Ajax请求之前统一的设置一个路径

    // 为有权限的接口添加
    if (option.url.indexOf("/my/") !== -1) {
        option.headers = {
            Authorization: localStorage.getItem("token") || ""
        }
    }
    // 挂在完成函数
    option.complete = function (data) {
        console.log(data.responseJSON)
        if (data.responseJSON.status !== 0) {
            localStorage.removeItem("token")

            location.href = "./login.html"
        }
    }

})