AutenticacionCtrl = {
	service: AutenticacionService,
	init: function (callback) {
		var ctrl = AutenticacionCtrl;
		ctrl.service.isLoggedIn(function (result) {
			callback(result);
		})
	},
	startLogin: function () {
		var ctrl = AutenticacionCtrl;
		var serv = PreferenciasService;
		myApp.loginScreen($$('.login-screen'), true);
		$$('#_username').val(serv.values.username || '');
		$$('#loginLink').click(ctrl.login);
		$$('#config-servidor').click(function () {
			var server = PreferenciasService.values.servidor_igglobal || '';
			myApp.modal({
				title: 'Servidor IGGLOBAL',
				text: 'URL ó IP pública',
				afterText: '<input type="text" class="modal-text-input" value="' + server + '">',
				buttons: [
					{
						text: 'Aceptar',
						onClick: function () {
							serv.values.servidor_igglobal = $$('.modal-text-input').val();
						}
					}
				]
			});
		});
		$$('#_username').on('keyup', function (e) { 
			  serv.values.username = $$('#_username').val(); 	
		});
		$$('#_password').on('keyup', function (e) { 
			  serv.values.password = $$('#_password').val();
		});
	},
	login: function () {
		var prefServ = PreferenciasService,
		dto = prefServ.values;

		function callback(success){
			//preferenciasCtrl.aplicar();
			myApp.hidePreloader();
			if(success == true) {
				myApp.closeModal($$('.login-screen'), true);
				
				//PreferenciasService.saveDeviceRegistrationId(deviceRegistrationId,function(){
					startApp();
				//});
				
				//if (self.loginCallback) self.loginCallback(true);
			} else {
				myApp.alert('Usuario o password incorrectos.', 'Error al autenticar');
			}
		}

		if(dto.username == '' || dto.password == ''  || dto.servidor_igglobal == '') {
			myApp.alert('Se requieren todos los datos para ingresar.', 'Datos requeridos');
			return;
		}

		myApp.showPreloader('Autenticando...'); 
		AutenticacionService.login(dto, callback);
		
		//{usuario_id: "ezequieljkkkk", password_id: "", servidor_igglobal: "nihihhibi"}
	},
	logout: function () {
		//alert();
		
			dbn.get('nLogin').then(function(doc){
				AutenticacionService.logout(doc.deviceTokenRegister,function(){})
				dbn.remove(doc);
				myApp.loginScreen($$('.login-screen'), true);
				PreferenciasService.values.password = '';
				$$('#_password').val('');
			})
		
		
	}
}