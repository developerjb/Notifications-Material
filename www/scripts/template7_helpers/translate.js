Template7.registerHelper('translate', function (field, options){
	var ret = _.findWhere(PreferenciasService.values.i18n, {Campo: field});
	if(ret) return ret.Texto;
	return field;
});