
$(function () {
    var Letao = function () {  }
    Letao.prototype = {
        addHistory: function () {
            $('.btn-search').on('tap',function () {
                var search = $('.input-search').val();
                if (!search.trim()) {
                    alert('请输入要搜索的商品');
                    return;
                }

                var data = window.localStorage.getItem('searchData');
                var id = 0;
                var flag = false;

                if (data && JSON.parse(data).length > 0 ) {
                    data = JSON.parse(data);
                    id = data[data.length-1].id+1;
                } else {
                    data = [];
                    id = 0;
                }

                for (var i = 0; i <= data.length-1; i++) {
                    if (search == data[i].search) {
                        flag = true;
                    }
                }

                if (flag == false) {
                    data.push({
                        'search': search,
                        'id': id
                    });
                }
                window.localStorage.setItem('searchData',JSON.stringify(data));
                letao.queryHistroy();                
                window.location.href = 'productlist.html?search='+search;
            });
        },
        queryHistroy: function () {
            var data = window.localStorage.getItem('searchData'); 
            var id = 0;
            if(data && JSON.parse(data).length > 0) {
                data = JSON.parse(data);
                id = data[data.length - 1].id+1;
            }else {
                data = [];
                id = 0;
            }
            $('.history>ul').html(template('historyTmp',{'rows':data}));
        },
        deleteHistory: function () {
            $('.history>ul').on('tap','.history i.btn-delete',function () {
                var dataId = $(this).data('id');
                var data = window.localStorage.getItem('searchData');
                var id = 0;
                if( data && JSON.parse(data).length>0) {
                    data = JSON.parse(data);
                    id = data[data.length-1].id+1;
                } else {
                    data = [];
                    id = 0;
                }
                for (var key in data) {      
                    if ( +dataId == +data[key].id ) {
                        data.splice(key,1);
                    } else {

                    }
                }
                window.localStorage.setItem('searchData',JSON.stringify(data));
                letao.queryHistroy();
            });
        },
        clearHistory: function () {
            $('.btn-clear').on('tap',function () {
                window.localStorage.setItem('searchData','');
                letao.queryHistroy();
            });
        }
    }


    var letao = new Letao();
    letao.queryHistroy();
    letao.addHistory();
    letao.deleteHistory();
    letao.clearHistory();
})
