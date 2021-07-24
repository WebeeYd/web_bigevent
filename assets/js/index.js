$(function(){
    getUserinfo()
    var layer = layui.layer
    // 点击按钮进行退出的操作
    $("#btnLoginout").click(function(){
        // 点击按钮之后显示确认的弹框
        layer.confirm('请问您是否确认退出?', {icon: 3, title:'提示'}, function(index){
            //do something
            // 点击退出确认 首先清除token
            localStorage.removeItem('token')
            // 然后调转页面
            location.href = './login.html'
            layer.close(index);
          });
    })
})

// 获取用户基本信息
function getUserinfo(){
    // 发送获取用户信息请求
    layui.layer.msg("正在加载...",{
        icon:3,
        time:1000
    })
    $.ajax({
        type:"get",
        url:"/my/userinfo",
        // 设置请求头
        // headers:{
        //     Authorization:localStorage.getItem("token")||""
        // },
        success:function(data){
            if(data.status!=0){
                return layui.layer.msg(data.message)
            }
            renderAvatar(data.data)
            layui.layer.msg("加载成功！",{
                icon:1,
                time:1000
            })
        }
    })
}
function renderAvatar(user){
    // 显示用户名
    var name = user.nickname || user.username
    // 获取相应元素修改内容
    $("#welcome").html("欢迎&nbsp;&nbsp;"+name)
    // 按照需要来渲染头像
    // 渲染图片头像
    console.log(user)
    if(user.user_pic!=null){
        $(".layui-nav-img").attr("src",user.user_pic).show()
        $(".text-avatar").hide()
    }
    // 渲染文本头像
    else{
        $(".layui-nav-img").hide()
        $(".text-avatar").html(name[0].toUpperCase()).show()
    }
}
// 在user中要调用的方法
function getUserinfomation(){
    // 发送获取用户信息请求
    $.ajax({
        type:"get",
        url:"/my/userinfo",
        // 设置请求头
        // headers:{
        //     Authorization:localStorage.getItem("token")||""
        // },
        success:function(data){
            if(data.status!=0){
                return layui.layer.msg(data.message)
            }
            renderAvatar(data.data)
        }
    })
}