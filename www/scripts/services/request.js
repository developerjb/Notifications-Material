var request = {
    get: function (data, options, callback) {
        $$.ajax({
            //url: 'http://' + PreferenciasService.values.servidor_igglobal + '/Request/ExecuteGet',
            url: options.url || 'http://10.12.13.164:9292/Request/ExecuteGet',
            method: 'GET',
            timeout: options.timeout || 10000,
            data: data || {},
            success: function (response) {
                callback(response);
            },
            error: function () {
                callback([]);
            }
        });
    }
}