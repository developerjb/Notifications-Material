function AutenticacionCtrl() {
	var self = this;
	self.init = _init;
	self.loginCallback = null;
	
	function _init(loginCallback) {
		self.service = NotificacionesService;
		self.loginCallback = loginCallback;
		$$('#loginLink').click(_login);
	}
	
	function _login() {
		function callback(success){	
			//setear la interfaz de usuario!
			alert(JSON.stringify(PreferenciasService.values));
			preferenciasCtrl.aplicar(); 
			myApp.hidePreloader();
			if(success == true) {
				myApp.closeModal($$('.login-screen'), true);
				if (self.loginCallback) self.loginCallback(true);
			} else {
				myApp.alert('Usuario o password incorrectos.', 'Error al autenticar');
			}
		}
		
		var dto = myApp.formToData('#login-form');
		if(dto.username == '' || dto.password == ''  || dto.servidor_igglobal == '') {
			myApp.alert('Se requieren todos los datos para ingresar.', 'Datos requeridos');
			return;
		}
				
		myApp.showPreloader('Autenticando...'); 
		AutenticacionService.login(dto, callback);
	}
}