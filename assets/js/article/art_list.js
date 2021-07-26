$(function () {
    var layer = layui.layer

    var form = layui.form

    var laypage = layui.laypage
    var q = {
        pagenum: 1,
        pagesize: 3,
        cate_id: '',
        state: ''
    }
    // 美化时间
    template.defaults.imports.dataFormat = function (data) {
        const dt = new Date(data)

        var y = dt.getFullYear()

        var m = padZero(dt.getMonth() + 1)

        var d = padZero(dt.getDate())

        var hh = padZero(dt.getHours())

        var mm = padZero(dt.getMinutes())

        var ss = padZero(dt.getSeconds())


        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss

    }
    // 补零的函数
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }
    // 获取列表数据
    initTable()
    initCate()


    function initTable() {
        $.ajax({
            type: "get",
            url: "/my/article/list",
            data: q,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                var temp = template("tp-list", res)
                $("tbody").html(temp)
                renderPage(res.total)
            }
        })
    }

    // 获取文章分类的方法
    function initCate() {
        $.ajax({
            type: "get",
            url: "/my/article/cates",
            success: function (data) {
                console.log(data)
                if (data.status !== 0) {
                    return layer.msg(data.message)
                }
                // layer.msg(data.message)
                // 利用模板引擎来渲染
                var catestring = template("tp-cate", data)
                $("[name=cate_id]").html(catestring)
                // 通知layui重新渲染表单结构
                console.log(catestring)
                form.render()
            }
        })
    }

    // 首先，为表单绑定提交的事件
    $("#form-search").on("submit", function (e) {
        // 阻止其默认的提交行为
        e.preventDefault()
        // 获取表单中的内容
        var cate_id = $("[name=cate_id]").val()

        var state = $("[name=state]").val()
        // 为重新获取表单数据改变
        q.cate_id = cate_id

        q.state = state
        // 调用方法重新渲染页面
        initTable()
    })


    // 定义渲染分页的方法
    function renderPage(total) {
        console.log(total)
        laypage.render({
            elem: "pageBox",
            count: total,
            limit: q.pagesize,
            curr: q.pagenum,
            layout: ['count', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            // 分页发生切换的时候的时候触发jump回调
            jump: function (obj, first) {
                q.pagenum = obj.curr
                // 根据最新的q获取最新的数据
                q.pagesize = obj.limit
                if (!first) {
                    initTable()
                }
                // 可以通过first的值里判断jump是触发的哪种回调

            }
        })
    }

    // var indexdel = null
    // 删除文章 通过代理的方式给动态生成的元素绑定事件
    $("tbody").on("click",".btndelete",function(){
        // 获取当前按钮的数目
        var delenum = $(".btndelete").length
        // 获取但其概念点击删除按钮的ID值
        var id = $(this).attr("data-id")
        // 发送删除的ajax请求
        layer.confirm('你确定要删除吗?', {icon: 3, title:'提示'}, function(index){
            //do something
            $.ajax({
                url:"/my/article/delete/"+id,
                success:function(res){
                    if(res.status!==0){
                        return layer.msg(res.message)
                    }
                    layer.msg(res.message)
                    // 当删除完成后要判断里面是否还有数据 如果没有 页码要减一
                    // 判断按钮数量是否为一 若是1 删除之后要使页码值减一 再重新渲染页面
                    if(delenum===1){
                        // 页码值最小为1
                        q.pagenum=q.pagenum===1?1:q.pagenum-1
                    }
                    initTable()
                }
            })
            layer.close(index);
          });
    })
    // 获取文章的内容
    // 实现编辑文章的功能
    $("tbody").on("click",".btnEdit",function(){
        layer.open({
            type:1,
            title: '编辑文章',
            area:["500px","450px"],
            content: $("#Edit").html()
          });    
          var id = $(this).attr("data-id")
        //   console.log(id)
        // 获取文章信息并且显示再表格上
        $.ajax({
            type:"get",
            url:"/my/article/"+id,
            success:function(resStr){
                console.log(resStr)
                form.val("form_Edit",resStr.data)
            }
        })
    })

})