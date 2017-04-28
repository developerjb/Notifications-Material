function AutorizacionesCtrl() {
	var self = this,
			_template;
	self.init = _init;
	//self.service = AutorizacionesService;
	//self.template = Template7.compile($$('#template_notificaciones').html());
	
	function _init() {
		$$.get('pages/template_autorizaciones.html', {}, function (data) {
	  	_template = Template7.compile(data);
	  	_runTemplate();	
		});
	}
	
	function _runTemplate() {
		var context = {
			autorizaciones: [1,2,3,4,5,1,2,3,4,5,1,2,3,4,5]
			//autorizaciones: getAllForUser()
		};
		$$('#list-autorizaciones').html(_template(context));
	}
		
}