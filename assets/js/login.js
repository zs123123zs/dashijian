$(function () {
    $('.go_login').on('click', function () {
        $('.login').show();
        $('.reg').hide();
        console.log(1);
    })
    $('.go_reg').on('click', function () {
        $('.login').hide();
        $('.reg').show();

    })
    var layer = layui.layer
    var form = layui.form
    form.verify({
        uname: function (value, item) {
            //value：表单的值、item：表单的DOM对象
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名首尾不能出现下划线\'_\'';
            }
            if (/^\d+\d+\d$/.test(value)) {
                return '用户名不能全为数字';
            }

        }, pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            var pwd = $('.reg [name=password]').val();
            if (pwd != value) {
                return '两次输入的密码不一致'
            }
        }
    })

    // 监听注册接口
    $('#link_reg').on('submit', function (e) {
        e.preventDefault()
        var uname = $('#link_reg [type="text"]').val()
        var psd = $('#link_reg [type="password"]').val()
        $.ajax({
            type: "post",
            url: "http://ajax.frontend.itheima.net/api/reguser",
            data: {
                username: uname,
                password: psd
            },
            success: function (res) {
                if (res.status != 0) {
                    layer.msg('注册失败')
                } else {
                    layer.msg('注册成功')
                    $('.go_login').click()
                }
            }
        })
    })
    // 监听登录接口
    $('#link_login').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: "post",
            data: $(this).serialize(),
            url: " http://ajax.frontend.itheima.net/api/login",
            success: function (res) {
                if (res.status != 0) {
                    layer.msg('登录失败')
                } else {
                    layer.msg('登录成功')
                }
            }
        })
    })
})