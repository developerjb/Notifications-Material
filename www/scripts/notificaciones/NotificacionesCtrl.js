NotificacionesCtrl = {
	service: NotificacionesService,
	init: function () {
		var ptrNotificaciones = $$('.pull-to-refresh-content');
		ptrNotificaciones.on('ptr:refresh', function (e) {
			NotificacionesService.getAllForUser(function (data) {
				sbNotificaciones.clear();
				$$('.searchbar-clear').click();
				vlNotificaciones.items = data;
				vlNotificaciones.update();
				myApp.pullToRefreshDone();
			})
		})
		sbNotificaciones = myApp.searchbar('.sb-notificaciones');
		vlNotificaciones = myApp.virtualList('.lb-notificaciones', {
			items: this.service.data,
			//cache:false,
			emptyTemplate: '<li class="item-content"><div class="item-inner"><div class="item-title">No hay elementos..</div></div></li>',
			//updatableScroll: true, 
			searchAll: function (query, items) {
				var found = [];
				for (var i = 0; i < items.length; i++) {
					if (items[i].TituloMensaje.indexOf(query) >= 0 || items[i].FechaGroup.indexOf(query) >= 0 || items[i].TextoMensaje.indexOf(query) >= 0 || items[i].UsuarioOrigen.indexOf(query) >= 0 || query.trim() === '') found.push(i);
				}
				return found;
			},
			template: '<li>' +
			'<a onclick="NotificacionesCtrl.loadPageAutorizacion({{@index}},{{Notificacion_Id}})" class="item-link item-content">' +
			'<div class="item-inner">' +
			'<div class="item-title-row">' +
			'<div class="item-title">{{TituloMensaje}}</div>' +
			'<div class="item-after">{{FechaGroup}}</div>' +
			'</div>' +
			'<div class="item-subtitle">{{TextoMensaje}}</div>' +
			'<div class="item-text">{{UsuarioOrigen}}</div>' +
			'</div>' +
			'</a>' +
			'</li>',
			height: 84
		});
		
		$$('.popup-rangeNotification').on('popup:open', function () {
			var s = NotificacionesService;
			$$('#DDFechaNotif').val(s.formatDateString(s.rangeNotification.DDFecha,'/','-'));
			$$('#HHFechaNotif').val(s.formatDateString(s.rangeNotification.HHFecha,'/','-'));
		});

		function loadDateGetRangos (dd, hh){
			var s = NotificacionesService;
			function combination(c,v){
				return c ? s.formatDateString(v,'-','/') : s.convertDate(new Date());
			}
			s.rangeNotification.DDFecha = dd ? combination(true,dd) : combination(false);
			s.rangeNotification.HHFecha = hh ? combination(true,hh) : combination(false);
			s.getAllForUser(function (data) {
				vlNotificaciones.items = data;
				vlNotificaciones.update();
				myApp.closeModal('.popup-rangeNotification');
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
	},
	setAsRead: function(index, notificacionId) {
		this.service.setAsRead(notificacionId, function(){
			$$('#n-' + notificacionId.toString()).hide();
			self.service.data[index].Leida = 1;
			//change sum of unread items (app badge)
			//self.service.setUnreadCounter();
		});
	},
	loadPageAutorizacion: function (index, notificacionId) {
		if(navigator.connection.type === 'none') {
			myApp.alert('No hay conexión a Internet.', 'No se puede recibir datos');
			return;
		}

		//this.setAsRead(index, notificacionId);

console.log(this.service.data[index]);
		mainView.router.load({ 
			url: 'pages/detalle_notificacion.html',
			context: this.service.data[index]
		});
	

	},
	defaultRangeView: function () {
		this.service.rangeNotification.DDFecha = '01/03/2017';
		//this.service.convertDate(new Date());
		this.service.rangeNotification.HHFecha = this.service.convertDate(new Date());
	}
}