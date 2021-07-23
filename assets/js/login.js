$(function(){
    // 点击“去注册账号的连接”
    $("#link_reg").on("click",function(){
        $(".reg-box").show()
        $(".login-box").hide()
    })

    // 点击去登录的连接
    $("#link_login").click(function(){
        $(".reg-box").hide()
        $(".login-box").show()
    })

    // 从layui里面获取校验对象
    var form = layui.form

    // 获取弹框提示效果
    var layer = layui.layer

    // 定义校验规则
    form.verify({
        // 定义密码校验规则
        pwd:[
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ] ,
        repwd:function(value){
            if($("#password").val()!=value){
                return "两次密码输入不一致 请重新输入"
            }
        }  
    })

    // 注册的实现流程
    $("#form_reg").submit(function(event){
        event.preventDefault()
        // 发送Ajax请求
        $.ajax({
            type:"post",
            url:"/api/reguser",
            data:{
                username:$("#form_reg [name=username]").val(),
                password:$("#form_reg [name=password").val()
            },
            success:function(data){
                console.log(data.message)
                layer.msg(data.message)
                if(data.status==0){
                    $(".reg-box").hide()
                    $(".login-box").show()
                }
            }            
        })
    })

    // 登录功能的实现
    $("#form_login").submit(function(event){
        event.preventDefault()
        $.ajax({
            type:"post",
            url:"/api/login",
            data:{
                username:$("#form_login [name=username]").val(),
                password:$("#form_login [name=password]").val()
            },
            success:function(data){
                layer.msg(data.message)
                if(data.status==0){
                    // console.log(data.token)
                    localStorage.setItem("token",data.token)
                    location.href = "./index.html"
                }
            }
        })
    })
})