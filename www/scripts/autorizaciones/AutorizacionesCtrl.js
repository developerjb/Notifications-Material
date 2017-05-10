AutorizacionesCtrl = {
	service: AutorizacionesService,
	init: function () {
		var self = this;
		myApp.onPageInit('Autorizaciones', function () {
			//var ptrAutorizaciones = $$('.pull-to-refresh-content');
			var ptrAutorizaciones = $$('.ptr-autorizaciones');

			ptrAutorizaciones.on('ptr:refresh', function (e) {
				AutorizacionesService.getAllForUser(function (data) {
					sbAutorizaciones.clear();
					vlAutorizaciones.clearCache();
					$$('.searchbar-clear').click();
					vlAutorizaciones.items = data;
					vlAutorizaciones.update();
					myApp.pullToRefreshDone();
				})
			})

			sbAutorizaciones = myApp.searchbar('.sb-autorizaciones');
			vlAutorizaciones = myApp.virtualList('.lb-autorizaciones', {
				items: self.service.data,
				emptyTemplate: '<li class="item-content"><div class="item-inner"><div class="item-title">No hay elementos.</div></div></li>',
				searchAll: function (query, items) {
					var found = [];
					for (var i = 0; i < items.length; i++) {
						var m = JSON.parse(items[i].Mensaje);
						if (items[i].FechaGroup != undefined && m.Title != undefined && m.Subtitle != undefined && m.Subtitle != undefined && m.Text1 != undefined && m.Text2) {
							if (items[i].FechaGroup.indexOf(query) >= 0 || m.Title.indexOf(query) >= 0 || m.Subtitle.indexOf(query) >= 0 || m.Text1.indexOf(query) >= 0 || m.Text2.indexOf(query) >= 0 || query.trim() === '') found.push(i);
						}
					}
					return found;
				},
				template: '<li style="height: 103px;">' +
				'<a onclick="AutorizacionesCtrl.loadPageAutorizacion({{@index}}, {{Notificacion_Id}})" class="item-link item-content">' +
				'<div class="item-inner">' +
				'<div class="item-title-row">' +
				'<div class="item-title">{{parse Mensaje Leida prop="Title"}}</div>' +
				'<div class="item-after">{{blackface FechaGroup}}</div>' +
				'</div>' +
				'<div class="item-subtitle">{{parse Mensaje Leida prop="Subtitle"}}</div>' +
				'<div class="item-text">' +
				'{{parse Mensaje Leida prop="Text1"}}' +
				'<br />' +
				'{{parse Mensaje Leida prop="Text2"}}' +
				'</div>' +
				'</div>' +
				'</a>' +
				'</li>',
				height: 103
			})

			$$('.open-autorizaciones').on('click', function () {
				var clickedLink = this;
				myApp.popover('.popover-autorizaciones', clickedLink);
			});
			
			function loadDateGetRangos(dd, hh) {
				var s = self.service;
				myApp.showPreloader('Obteniendo...');
				function combination(c, v) {
					return c ? s.formatDateString(v, '-', '/') : s.convertDate(new Date());
				}
				s.rangeAutorizacion.DDFecha = dd ? combination(true, dd) : combination(false);
				s.rangeAutorizacion.HHFecha = hh ? combination(true, hh) : combination(false);
				s.getAllForUser(function (data) {
					vlAutorizaciones.items = data;
					vlAutorizaciones.update();
					myApp.closeModal('.popup-rangeAutorizacion');
					myApp.hidePreloader();
				})
			}

			$$('.apply-range-autorizacion').click(function () {
				myApp.closeModal('.popup-rangeAutorizacion');
				//DDFechaAutori
				loadDateGetRangos($$('#DDFechaAutori').val(), $$('#HHFechaAutori').val());
				$$('#_filterAutorizacion').css({ 'color': 'yellow' })
			});

			$$('.remove-range-autorizacion').click(function () {
				myApp.closeModal('.popup-rangeAutorizacion');
				//HHFechaAutori
				//loadDateGetRangos();
				loadDateGetRangos();
				$$('#_filterAutorizacion').css({ 'color': '' })
			});

			$$('.popup-rangeAutorizacion').on('popup:open', function () {
				var s = self.service;
				$$('#DDFechaAutori').val(s.formatDateString(s.rangeAutorizacion.DDFecha, '/', '-'));
				$$('#HHFechaAutori').val(s.formatDateString(s.rangeAutorizacion.HHFecha, '/', '-'));
			});

		})

	},
	loadPageAutorizacion: function (index, notificacionId) {
		var self = this;

		if (navigator.connection.type === 'none') {
			myApp.alert('No hay conexión a Internet.', 'No se puede recibir datos');
			return;
		}

		var mensaje = JSON.parse(self.service.data[index]['Mensaje']);
		var list = [];
		var params = {
			Entity: '',
			ConnectionStringId: '',
			Keys: ''
		};
		for (var property in mensaje) {
			if (mensaje.hasOwnProperty(property)) {
				if (property != 'Text1' && property != 'Text2' && property != 'Title' && property != 'Subtitle' && property != 'ActualState' && property != 'ActualStateDesc' && property != 'Entity' && property != 'ConnectionStringId' && property != 'Keys') {
					list.push({
						label: property,
						value: mensaje[property]
					});
				} else {
					params[property] = mensaje[property];
				}
			}
		}

		mainView.router.load({
			url: 'pages/detalle_autorizacion.html',
			context: {
				id: notificacionId,
				index: index,
				leida: self.service.data[index].Leida,
				props: list,
				params: params
			}
		});
	},
	defaultRangeView: function () {
		var self = this;
		//self.service.rangeAutorizacion.DDFecha = '01/03/2017';
		self.service.rangeAutorizacion.DDFecha = this.service.convertDate(new Date());
		self.service.rangeAutorizacion.HHFecha = this.service.convertDate(new Date());
	}
}