PreferenciasService = {
	values: {
		//username:'ezequiel',
		//password:'',
		//servidor_igglobal:'10.12.13.111:9090'
		//servidor_igglobal:'10.12.13.164:9292',
		//servidor_igglobal:'10.12.13.243:4582'
	},
	createStore: function() {
	},
	get: function(callback) {
		
	},
	save: function(preferencias, callback) {
	},
	saveDeviceRegistrationId: function(deviceRegistrationId, callback) {
		$$.ajax({
			url: 'http://' + PreferenciasService.values.servidor_igglobal + '/Push/Registrar',
			method: 'POST',
			timeout: AJAX_TIMEOUT,
			data: {
				usuario: PreferenciasService.values.username,
				plataforma: 'ANDROID',
				canal: deviceRegistrationId
			},
			headers: {
				requester: true
			},
			success: function(response) {
				if(callback) callback();
			},
			error: function() {
				myApp.alert('Revise la configuración de conexión (tiempo de espera agotado).', 'Servidor no encontrado');
				if(callback) callback({});
			}
		});
	}
}