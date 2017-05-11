AutenticacionService = {
	token: {},
	login: function (dto, callback) {

		function encrypt(plain) {
			var passphrase = 'powerhorse';
			return CryptoJS.AES.encrypt(plain, passphrase).toString();
		}

		var ip = dto.servidor_igglobal;

		$$.ajax({
			url: 'http://' + ip + '/Account/Login',
			method: 'POST',
			timeout: AJAX_TIMEOUT,
			dataType: 'json',
			data: {
				u: dto.username,
				p: encrypt(dto.password),
				markAsLoggedIn: false,
				api: true,
				mobileAppName: 'notifications'
			},
			success: function (response) {
				if (response.code.toString() != '0') {
					if (callback) callback(false);
				} else {
					//callback(true);
					dto.i18n = response.data.translatedForms;
					AutenticacionService.setLoggedIn(dto, '', callback);
				}

			},
			error: function () {
				myApp.alert('Revise la configuración de conexión (tiempo de espera agotado).', 'Servidor no encontrado');
				if (callback) callback(false);
			}
		});
	},
	setLoggedIn: function (dto, token, callback) {
		dbn.get('nLogin')
			.then(function (doc) {
				//callback(false);
			}).catch(function (err) {
				if (err.status == 404) {
					dto._id = 'nLogin';
					dto.deviceTokenRegister = deviceTokenRegister;
					PreferenciasService.values = dto;
					dbn.put(dto).then(function (resp) {
						PreferenciasService.saveDeviceRegistrationId(deviceTokenRegister, function () {
							callback(true);
						})
					});
				}
			});

	},
	isLoggedIn: function (callback) {
		dbn.get('nLogin')
			.then(function (doc) {
				PreferenciasService.values = doc;
				callback(false);
			}).catch(function (err) {
				callback(true);
			});


	},
	logout: function (item,callback) {

		$$.ajax({
			url: 'http://' + PreferenciasService.values.servidor_igglobal + '/Account/Logout?u=&deviceId=' + item.toString(),
			method: 'GET',
			timeout: AJAX_TIMEOUT,
			success: function (response) {
				callback();
			},
			error: function () {
				myApp.alert('Revise la configuración de conexión (tiempo de espera agotado).', 'Servidor no encontrado');
				callback();
			}
		});

	}
}