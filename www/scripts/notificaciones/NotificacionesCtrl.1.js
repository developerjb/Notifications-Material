function NotificacionesCtrl() {
	var self = this, _template;
	self.init = _init;

	function _init() {
		self.service = NotificacionesService;
		//alert('');
		$$.get('pages/template_notificaciones.html', {}, function (data) {
			_template = Template7.compile(data);
			_runTemplate(self.service.data);
		});
	}

	

	function _runTemplate(data) {
		 //alert("_runTemplate");
		  self.dataNotificacionesAll = JSON.parse(JSON.stringify(data));
		  var data_notification = JSON.parse(JSON.stringify(data));
		  self.dataNotificacionesTop = data_notification;
		  self.dataNotificacionesTop.length = 20;
		
		var context = {
			//items: [1,2,3,4,5,1,2,3,4,5,1,2,3,4,5]
			items: self.dataNotificacionesTop
		};

		$$('#list-notificaciones').html(_template(context));

		 self.loading = false;
		// //var loading = false;

		// // Last loaded index
		 self.lastIndex = $$('.list-block.scroll-notificaciones li').length;

		// // Max items to load
		 self.maxItems = self.dataNotificacionesAll.length;

		// // Append items per load
		self.itemsPerLoad = 20;

		
	}
}