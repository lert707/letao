
$(function () {
    var Letao = function () {

    }
    Letao.prototype = {
        initScroll: function () {
            options = {
                scrollY: true, //是否竖向滚动
                scrollX: false, //是否横向滚动
                startX: 0, //初始化时滚动至x
                startY: 0, //初始化时滚动至y
                indicators: true, //是否显示滚动条
                deceleration:0.0006, //阻尼系数,系数越小滑动越灵敏
                bounce: true //是否启用回弹
            }
            mui('.mui-scroll-wrapper').scroll(options);
        },
        getCategoryLeft: function () {
            $.ajax({
                url: '/category/queryTopCategory',
                success: function (backdata) {
                    $('.category-left ul').html(template('category-left-tmp',backdata));
                }
            });
        },
        getCategoryRight: function () {
            getCategory(1);

            $('.category-left').on('click','a',function () {
                $(this).parent().addClass('active').siblings().removeClass('active');
                getCategory($(this).data('id'));
            });
            function getCategory(id) {
                $.ajax({
                    url: '/category/querySecondCategory',
                    data: {
                        id: id
                    },
                    success: function (backdata) {
                        var result = template('category-right-tmp',backdata);
                        if (result) {
                            $('.category-right .mui-row').html(result);
                        } else {
                            $('.category-right .mui-row').html('<h3>程序员正在加班制作中</h3>');
                        }
                    }
                });
            }
        }
    }

    var letao = new Letao();
    letao.initScroll();
    letao.getCategoryLeft();
    letao.getCategoryRight();
})