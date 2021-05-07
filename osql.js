/**
 * osql.js oursqlにアクセスするためのライブラリ
 * setting.jsにサーバ情報を書き込んで利用する
 * 
 * version 1.0.0 2021.04.27
 */

var osql = {};

osql.connect = function (sql) {
    console.log(sql);
    var query = {};
    query.userid = settings.userid;
    query.password = settings.password;
    query.db = settings.db;
    query.sql = sql;
    return new Promise(function (resolve) {
        $.post(settings.apiurl, query, function (data, textStatus) {
            try {
                if (data && data.startsWith('Error:')) {
                    console.error(sql);
                    console.error(data);
                    window.alert(data + '\n' + sql);
                    return;
                }
                var objects = JSON.parse(data);
                resolve(objects);
            } catch (ex) {
                console.error(ex);
                console.error(sql);
            }
        });
    });
}

osql.getParams = function () {
    var paramstr = document.location.search.substring(1);
    paramstr = decodeURI(paramstr);
    var paramstrs = paramstr.split('&');
    params = {};
    paramstrs.forEach(function (each) {
        var tokens = each.split('=');
        params[tokens[0]] = tokens[1];
    });
    return params;
};

osql.getParam = function (key) {
    return osql.getParams()[key];
};

