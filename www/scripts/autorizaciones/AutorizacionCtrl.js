AutorizacionCtrl = {
    service: AutorizacionesService,
    context: {},
    template: {},
    templateAdjuntos: {},
    _cargando:"",
    responderClickHandler: function () {
        var self = AutorizacionCtrl;
        function callback(response) {
            var target = this;
            var buttons = [];

            for (i = 0; i < response.length; i++) {
                var r = response[i];
                buttons.push({
                    text: r.Descripcion,
                    Descripcion: r.Descripcion,
                    EstadoHasta: r.EstadoHasta,
                    onClick: function () {
                        self.sendConfirm(this.EstadoHasta, this.Descripcion);
                    }
                })
            }
            buttons.push({
                text: 'Cancelar',
                color: 'red'
            });

            myApp.actions(target, buttons);
        }
        self.service.getNextStates(self.context.params.Entity, self.context.params.ConnectionStringId, self.context.params.ActualState, callback);
    },
    init: function () {
        var self = AutorizacionCtrl;
        myApp.onPageInit('Autorizacion', function (page) {
            //alert();
            self.context = page.context;
            self.template = Template7.compile($$('#template_respuestas').html());
            $$('#respuestas').hide();
            self.getHistory();

            if (self.context.leida == 1) {
                //$$('#responder').css('color', '#f7f7f8');
                $$('.right #responder').remove();
            } else {
                $$('#responder').on('click', self.responderClickHandler);
            }

            $$('.open-adjuntos').click(function () {
                self.getAttachments();
            });


            self.templateAdjuntos = Template7.compile($$('#template_adjuntos').html());
            
            myApp.onPageBack('Autorizacion',function(){
                vlAutorizaciones.clearCache();
                vlAutorizaciones.update();
            })
        })
    },
    getHistory: function () { 
        var self = this;
        function callback(response) {
			self._cargando = $$('#cargando').remove();
			
			var context = { 
				respuestas: response
			};
			$$('#respuestas').html(self.template(context)).show();
		}
		$$('#respuestas').hide();

		self.service.getHistory(self.context.params.Entity, self.context.params.ConnectionStringId, self.context.params.Keys, callback);
    },
    getAttachments: function () { 
        var self = this;
        myApp.showPreloader('Obteniendo...');
		function callback(response) {
			myApp.hidePreloader();
			var context = {
				adjuntos: response
			}
			$$('#list-adjuntos').html(self.templateAdjuntos(context));
			myApp.popup('.popup-adjuntos');
		}
		self.service.getAttachments(self.context.params.Entity, self.context.params.ConnectionStringId, self.context.params.Keys, callback);
    },
    sendConfirm: function (key, desc) { 
        var self = AutorizacionCtrl;
        if(PreferenciasService.values.confirmar_touchid == true) {
			touchid.authenticate(function() { doSendState(key); }, function() {}, 'Confirmar respuesta: '+ desc);
		} else {
			doSendState(key);
		}
		function doSendState(key) {
            //var self = this;
			function callback() {
				self.getHistory();
				
				$$('#a-' + self.context.id.toString()).hide();
				AutorizacionesService.data[self.context.index].Leida = 1;
				//change sum of unread items (app badge)
				//AutorizacionesService.setUnreadCounter();
				//$$('#responder').css('color', '#f7f7f8');
                $$('.right #responder').remove();
				$$('#responder').off('click', self.responderClickHandler);
                vlAutorizaciones.items[self.context.index].Leida = 1;
                AutorizacionesService.data[self.context.index].Leida = 1;
				NotificacionesService.setAsRead(self.context.id);
			}
			AutorizacionesService.sendState(self.context.params.Entity, self.context.params.ConnectionStringId, self.context.params.Keys, key, callback);
			$$(self._cargando).insertAfter($$('#titulo-historico-estados'));
		}
    }
}