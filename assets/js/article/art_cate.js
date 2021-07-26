$(function () {
    var layer = layui.layer
    var form = layui.form
    // 获取文章信息并且渲染（用模板到页面上去）
    getArtInfo()

    var indexadd = null
    $("#btnAddCate").on("click", function () {
        indexadd = layer.open({
            type: 1,
            area: ["500px", "250px"],
            title: "添加文章分类",
            content: $("#dialog-add").html()
        })
    })

    // 通过代理的形式，被表单提交绑定的事件 
    $("body").on("submit", "#form-top", function (e) {
        // 用ajax实现文章的添加功能
        e.preventDefault()
        $.ajax({
            type: "post",
            url: "/my/article/addcates",
            data: $("#form-top").serialize(),
            success: function (data) {
                if (data.status !== 0) {
                    return layer.msg(data.message)
                }
                layer.msg(data.message)
                getArtInfo()
                layer.close(indexadd)
            }
        })
    })


    var indexEdit = null
    // 实现编辑的功能
    $("tbody").on("click", "#btnEdit", function () {
        indexEdit = layer.open({
            type: 1,
            area: ["500px", "250px"],
            title: "修改文章分类",
            content: $("#dialog-Edit").html()
        })
        console.log($(this).parent().siblings("#hidden").html())
        var id = $(this).parent().siblings("#hidden").html()
        // var id = $(this).attr("data-id")
        // console.log(id)
        $.ajax({
            type: "get",
            url: "/my/article/cates/" + id,
            success: function (data) {
                form.val("form-Edit", data.data)
            }
        })
        // console.log(this)
        // 点击提交修改分类信息
        $("#form-Edit").on("submit", function (w) {
            w.preventDefault()
            // 发起ajax请求进行修改
            $.ajax({
                type: "post",
                url: "/my/article/updatecate",
                data: $(this).serialize(),
                success: function (data) {
                    if (data.status !== 0) {
                        return layer.msg(data.message)
                    }
                    layer.msg(data.message)
                    // 取消弹窗
                    layer.close(indexEdit)
                    // 刷新页面 再次获取
                    getArtInfo()
                }
            })
        })
    })


    // 实现删除的功能
    $("tbody").on("click", "#btndelete", function () {
        var $this = $(this)
        layer.confirm('确认删除?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            //do something
            // 若取消则什么都不做 否则执行回调函数中的操作
            var ID = $this.attr("data-id")
            console.log(ID)
            $.ajax({
                type: "get",
                url: "/my/article/deletecate/" + ID,
                success: function (data) {
                    if (data.status !== 0) {
                        return layer.msg(data.message)
                    }
                    layer.msg(data.message)
                    layer.close(index)
                    getArtInfo()
                }
            })
        })
    })


    // 获取页面信息的函数
    function getArtInfo() {
        $.ajax({
            type: "get",
            url: "/my/article/cates",
            success: function (data) {
                // console.log(data)
                var resStr = template("template", data)
                // console.log(resStr)
                $("tbody").html(resStr)
            }
        })
    }
})