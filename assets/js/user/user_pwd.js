$(function(){
    // 引入消息框
    var layer = layui.layer
    // 设置密码的校验规则
    var form = layui.form
    // 校验
    form.verify({
    // 密码格式的限定
        pwd:[
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ],
    // 两次输入密码必须一致的判定
    beSame:function(value){
        if(value!=$("input[name=newPwd]").val()){
            return "两次密码输入不一致"
        }
    },
    // 检查原密码是否正确
    checkOldName:function(value){

    },
    // 新旧密码不能相同
    cannotSame:function(value){
        if(value===$("input[name=oldPwd]").val()){
            return "新旧密码不能相同"
        }
    }
    })
    // 发起重置密码的请求
    $(".layui-form").on("submit",function(e){
        e.preventDefault()
        let $this= $(this)
        // 发起Ajax请求
        $.ajax({
            type:"post",
            url:"/my/updatepwd",
            data:$this.serialize(),
            success:function(data){
                console.log(data)
                if(data.status!==0){
                    return layer.msg(data.message)
                }
                layer.msg(data.message)
                // 成功后需要把表单重置
                $this[0].reset()
            }
        })
    })
})