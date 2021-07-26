$(function () {
    var layer = layui.layer

    var form = layui.form
    // 初始化富文本编辑器
    initEditor()

    initCate()
    // 定义加载文章分类的方法
    function initCate() {
        $.ajax({
            url: "/my/article/cates",
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // console.log(res)
                // layer.msg(res.message)
                var selectString = template("tb-down", res)
                // console.log(selectString)
                $("[name=cate_id]").html(selectString)
                form.render()
            }
        })
    }
    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)
    // 模拟点击事件
    $("#btnchooseImage").on("click", function () {
        $("#coverFile").click()
    })
    // 监听coverfile的change事件，获取它选择的图片
    $("#coverFile").on("change", function (e) {
        var file = e.target.files
        // 判断用户是否选择了文件
        if (file.length == 0) {
            return layer.msg("请选择图片")
        }
        // 将图片转变成一个地址
        var newImgURL = URL.createObjectURL(file[0])
        // 将地址设置为图片
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域

    })

    // 默认为发布状态
    var art_state = '已发布'
    // 当点击草稿按钮时，转变状态
    $("#caogao").on("click", function () {
        art_state = "草稿"
    })

    // 为表单中绑定提交事件
    $("#art_sub").on("submit", function (e) {
        // 阻止默认事件的发生
        e.preventDefault()
        // alert(1)

        var fd = new FormData($(this)[0])

        fd.append("state", art_state)

        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) { // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append('cover_img',blob)
                $.ajax({
                    type:"post",
                    url:"/my/article/add",
                    data:fd,
                    // 如果向服务器提交的时formdata的数据 要添加以下配置项：
                    contentType:false,
                    processData:false,
                    success:function(res){
                        console.log(res)
                        if(res.status!==0){
                            return layer.msg(res.message)
                        }
                        layer.msg(res.message)
                        location.href = "/article/art_list.html"
                    }
                })
            })
            
    })
   
})