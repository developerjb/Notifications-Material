AutorizacionesCtrl = {
	service: AutorizacionesService,
	init: function () {
		var self = this;
		myApp.onPageInit('Autorizaciones', function () {
			vlAutorizaciones = myApp.virtualList('.lb-autorizaciones', {
				items: self.service.data,
				emptyTemplate: '<li class="item-content"><div class="item-inner"><div class="item-title">No hay elementos..</div></div></li>',
				template: '<li>' +
					'<div class="item-inner">' +
						'<div class="item-title-row">' +	
							'<div class="item-title">{{parse Mensaje prop="Title"}}</div>' +
							'<div class="item-after">{{FechaGroup}}</div>' +
						'</div>' +
						'<div class="item-subtitle">{{parse Mensaje prop="Subtitle"}}</div>' +
						'<div class="item-text">' +
								'{{parse Mensaje prop="Text1"}}' +
							'<br />' +
								'{{parse Mensaje prop="Text2"}}' +
						'</div>' +
					'</div>' +
				'</li>',
				height:113
			})
			// vlNotificaciones = myApp.virtualList('.lb-notificaciones', {
			// 	items: self.service.data,
			// 	emptyTemplate: '<li class="item-content"><div class="item-inner"><div class="item-title">No hay elementos..</div></div></li>',
			// 	searchAll: function (query, items) {
			// 		var found = [];
			// 		for (var i = 0; i < items.length; i++) {
			// 			if (items[i].TituloMensaje.indexOf(query) >= 0 || items[i].FechaGroup.indexOf(query) >= 0 || items[i].TextoMensaje.indexOf(query) >= 0 || items[i].UsuarioOrigen.indexOf(query) >= 0 || query.trim() === '') found.push(i);
			// 		}
			// 		return found;
			// 	},
			// 	template: '<li>' +
			// 	'<a onclick="NotificacionesCtrl.loadPageAutorizacion({{@index}},{{Notificacion_Id}})" class="item-link item-content">' +
			// 		'<div class="item-inner">' +
			// 			'<div class="item-title-row">' +
			// 				'<div class="item-title">{{blackface TituloMensaje Leida}}</div>' +
			// 				'<div class="item-after">{{blackface FechaGroup Leida}} </div>' +
			// 			'</div>' +
			// 			'<div class="item-subtitle">{{blackface TextoMensaje Leida}}</div>' +
			// 			'<div class="item-text">{{blackface UsuarioOrigen Leida}}</div>' +
			// 		'</div>' +
			// 	'</a>' +
			// 	'</li>',
			// 	height: function(){
			// 		if($$('html').height() > 600){
			// 			return 93
			// 		}
			// 		return 83; 
			// 	}
			// });

			$$('.open-autorizaciones').on('click', function () {
				var clickedLink = this;
				myApp.popover('.popover-autorizaciones', clickedLink);
			});
		})

	},
	defaultRangeView: function () {
		var self = this;
		this.service.rangeAutorizacion.DDFecha = '01/03/2017';
		//self.service.rangeAutorizacion.DDFecha = this.service.convertDate(new Date());
		self.service.rangeAutorizacion.HHFecha = this.service.convertDate(new Date());
	}
}

// function AutorizacionesCtrl() {
// 	var self = this,
// 			_template;
// 	self.init = _init;
// 	//self.service = AutorizacionesService;
// 	//self.template = Template7.compile($$('#template_notificaciones').html());

// 	function _init() {
// 		$$.get('pages/template_autorizaciones.html', {}, function (data) {
// 	  	_template = Template7.compile(data);
// 	  	_runTemplate();	
// 		});
// 	}

// 	function _runTemplate() {
// 		var context = {
// 			autorizaciones: [1,2,3,4,5,1,2,3,4,5,1,2,3,4,5]
// 			//autorizaciones: getAllForUser()
// 		};
// 		$$('#list-autorizaciones').html(_template(context));
// 	}

// }

