
var letao;
var search;

$(function () {
    var Letao = function () {  }

    Letao.prototype = {
        initPullRefresh: function () {
            mui.init({
                pullRefresh : {
                    container:"#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
                    down : {
                        height:50,//可选,默认50.触发下拉刷新拖动距离,
                        auto: false,//可选,默认false.首次加载自动下拉刷新一次
                        contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                        contentover : "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                        contentrefresh : "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                        callback :function () {
                            setTimeout(function() {
                                // 延迟1.5秒结束下拉刷新
                                mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
                                //每次下拉刷新的时候要重置上拉加载更多
                                mui('.mui-scroll-wrapper').pullRefresh().refresh(true);
                            }, 1500);
                        } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                    },
                    up: {
                        auto: false,
                        contentnomore:'再下实在给不了更多...',
                        callback: function() {
                                setTimeout(function() {
                                // 延迟1.5秒结束上拉加载更多
                                // mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh();
                                // 调用结束上拉加载更多并且传入了true既结束上拉加载更多并且提示没有更多数据
                                mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(true);                             
                            }, 1500);
                        } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                    }
                }
            });
        },
        getProductList: function (obj ,callback) {
            $.ajax({
                url: '/product/queryProduct',
                data:{
                    page: obj.page || 1,
                    pageSize: obj.pageSize || 10,
                    proName: obj.proName,
                    price: obj.price,
                    num: obj.num
                },
                success: function (backdata) {
                    if (callback) {
                        callback(backdata);
                    }
                }
            });
        },
        searchProductList: function () {
            $('.btn-search').on('tap',function () {
                search = $('.input-search').val();
                var data = window.localStorage.getItem('searchData');
                var id = 0;
                if (data && JSON.parse(data).length > 0) {
                    data = JSON.parse(data);
                    id = data[data.length-1].id+1;
                } else {
                    data = [];
                    id = 0;
                }
                var flag = false;
                for (var key in data) {
                    if (search == data[key].search) {
                        flag = true;
                    }
                }
                if (flag == false) {
                    data.push({
                        search: search,
                        id: id
                    });
                }
                window.localStorage.setItem('searchData',JSON.stringify(data));
                letao.getProductList({
                    proName: search
                },function (backdata) {
                    $('.content .mui-row').html(template('productListTmp',backdata));            
                });
            });
        }
    }


    letao = new Letao();
    letao.initPullRefresh();
    // 获取
    search = getQuerySearch('search');
    letao.getProductList({
        proName: search
    },function (backdata) {
        $('.content .mui-row').html(template('productListTmp',backdata));            
    });

    // 查询
    letao.searchProductList();
})

// 获取url中所要查询的数据
function getQuerySearch (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURI(r[2]);
    } else {
        return null;
    }
}