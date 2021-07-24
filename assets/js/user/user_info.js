$(function () {
    initUserInfo()

    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return "昵称长度应在1~6之间"
            }
        }
    })
    // 重置用户信息
    $("button[type=button").click(function () {
        initUserInfo()
    })
    // 点击按钮更新用户的信息
    $("#submit").click(function(e){
        e.preventDefault()
        console.log("hello")
        $.ajax({
            type: "post",
            url: "/my/userinfo",
            data: $(".layui-form").serialize(),
            success: function (data) {
                // console.log(data)
                if(data.status!==0){
                    return layer.msg("更新用户信息失败")
                }
                layer.msg("更新用户信息成功！")
                // 调用父页面的方法重新渲染头像 window指子页面自己 parent是本页面的父页面
                window.parent.getUserinfomation()
            }
        })
    })

  
    // 初始化用户的基本信息
    function initUserInfo() {
        $.ajax({
            type: "get",
            url: "/my/userinfo",
            success: function (data) {
                if (data.status !== 0) {
                    return layer.msg("获取用户信息失败")
                }
                $("input[name=id]").val(data.data.id)
                $("input[name=username]").val(data.data.username)
                $("input[name=nickname]").val(data.data.nickname)
                $("input[name=email]").val(data.data.email)
            }
        })
    }

})