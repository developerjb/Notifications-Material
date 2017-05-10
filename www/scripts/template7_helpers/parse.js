Template7.registerHelper('parse', function (jsonAsString, read, options){
	
	if (options.hash.prop == '' || options.hash.prop == undefined) throw 'A key must be given.';
	var value = JSON.parse(jsonAsString)[options.hash.prop];
	var parsed =(value) ? value.toString() : value;
	
	var ret = _.findWhere(PreferenciasService.values.i18n, {Campo: parsed});
	if(ret) return (read == 1) ? ret.Texto : '<b>' + ret.Texto + '</b>'; 

	return (read == 1) ? parsed : '<b>' + parsed + '</b>';
	//return parsed;

});