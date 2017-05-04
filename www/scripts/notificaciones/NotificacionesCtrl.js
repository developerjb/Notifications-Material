NotificacionesCtrl = {
	service: NotificacionesService,
	init: function () {
		var self = this;
		
		var ptrNotificaciones = $$('.pull-to-refresh-content');
		ptrNotificaciones.on('ptr:refresh', function (e) {
			NotificacionesService.getAllForUser(function (data) {
				sbNotificaciones.clear();
				vlNotificaciones.clearCache();
				$$('.searchbar-clear').click();
				vlNotificaciones.items = data;
				vlNotificaciones.update();
				myApp.pullToRefreshDone();
			})
		})
		sbNotificaciones = myApp.searchbar('.sb-notificaciones');
		vlNotificaciones = myApp.virtualList('.lb-notificaciones', {
			items: self.service.data,
			emptyTemplate: '<li class="item-content"><div class="item-inner"><div class="item-title">No hay elementos..</div></div></li>',
			searchAll: function (query, items) {
				var found = [];
				for (var i = 0; i < items.length; i++) {
					if (items[i].TituloMensaje.indexOf(query) >= 0 || items[i].FechaGroup.indexOf(query) >= 0 || items[i].TextoMensaje.indexOf(query) >= 0 || items[i].UsuarioOrigen.indexOf(query) >= 0 || query.trim() === '') found.push(i);
				}
				return found;
			},
			template: '<li style="height: 83px;">' +
			'<a onclick="NotificacionesCtrl.loadPageAutorizacion({{@index}},{{Notificacion_Id}})" class="item-link item-content">' +
				'<div class="item-inner">' +
					'<div class="item-title-row">' +
						'<div class="item-title">{{blackface TituloMensaje Leida}}</div>' +
						'<div class="item-after">{{blackface FechaGroup Leida}} </div>' +
					'</div>' +
					'<div class="item-subtitle">{{blackface TextoMensaje Leida}}</div>' +
					'<div class="item-text">{{blackface UsuarioOrigen Leida}}</div>' +
				'</div>' +
			'</a>' +
			'</li>',
			height: 83,
			// function(){
			// 	if($$('html').height() > 600){
			// 		return 93
			// 	}
			// 	return 83; 
			// },
		});
		
		$$('.popup-rangeNotification').on('popup:open', function () {
			var s = NotificacionesService;
			$$('#DDFechaNotif').val(s.formatDateString(s.rangeNotification.DDFecha,'/','-'));
			$$('#HHFechaNotif').val(s.formatDateString(s.rangeNotification.HHFecha,'/','-'));
		});

		function loadDateGetRangos (dd, hh){
			var s = self.service;
			myApp.showPreloader('Obteniendo...');
			function combination(c,v){
				return c ? s.formatDateString(v,'-','/') : s.convertDate(new Date());
			}
			s.rangeNotification.DDFecha = dd ? combination(true,dd) : combination(false);
			s.rangeNotification.HHFecha = hh ? combination(true,hh) : combination(false);
			s.getAllForUser(function (data) {
				vlNotificaciones.items = data;
				vlNotificaciones.update();
				myApp.closeModal('.popup-rangeNotification');
				myApp.hidePreloader();
			})
		}

		$$('.apply-range-notification').click(function(){
			loadDateGetRangos($$('#DDFechaNotif').val(),$$('#HHFechaNotif').val());
			$$('#_filterNotification').css({'color':'yellow'})
		});

		$$('.remove-range-notification').click(function(){
			loadDateGetRangos();
			$$('#_filterNotification').css({'color':''})
		});

		$$('.open-notificaciones').on('click', function () {
			var clickedLink = this;
			myApp.popover('.popover-notificaciones', clickedLink);
		});

		myApp.onPageBack('Notificacion',function(){
			vlNotificaciones.clearCache();
			vlNotificaciones.update();
		})
	},
	setAsRead: function(index, notificacionId) {
		var self = this;
		self.service.setAsRead(notificacionId, function(){
			self.service.data[index].Leida = 1;
		});
	},
	loadPageAutorizacion: function (index, notificacionId) {
		var self = this;
		if(navigator.connection.type === 'none') {
			myApp.alert('No hay conexión a Internet.', 'No se puede recibir datos');
			return;
		}
		
		if(self.service.data[index].Leida == 0){
			self.setAsRead(index, notificacionId);
		}
		
		mainView.router.load({ 
			url: 'pages/detalle_notificacion.html',
			context: self.service.data[index]
		});
	

	},
	defaultRangeView: function () {
		var self = this;
		//this.service.rangeNotification.DDFecha = '01/03/2017';
		self.service.rangeNotification.DDFecha = this.service.convertDate(new Date());
		self.service.rangeNotification.HHFecha = this.service.convertDate(new Date());
	}
}