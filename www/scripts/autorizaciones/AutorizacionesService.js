AutorizacionesService = {
	data: [],
	selected: null,
	rangeAutorizacion: {},
	convertDate: function (inputFormat) {
		function pad(s) { return (s < 10) ? '0' + s : s; }
		var d = inputFormat;
		return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/');
	},
	formatDateString: function (date, origen, destino) {
		var d = date.split(origen);
		return [d[2], d[1], d[0]].join(destino);
	},
	getAllForUser: function (callback, range) {
		var self = this;
		var data = {
			id: 'CLO-8',
			Usuario_Id: PreferenciasService.values.username, //'JEFE',
			_userName: PreferenciasService.values.username, //'JEFE',
			_connectionStringId: '-',//PreferenciasService.values.conexion
			hasRange: 1,
			DDFecha: self.rangeAutorizacion.DDFecha,
			HHFecha: self.rangeAutorizacion.HHFecha
		}

		// if(range) {
		// 	data.DDFecha = range.DDFecha;
		// 	data.HHFecha = range.HHFecha;
		// }

		//todas las notificaciones que sean de módulo 'WF', ya que fueron insertadas como solicitud de respuesta de un workflow.
		$$.ajax({
			url: 'http://' + PreferenciasService.values.servidor_igglobal + '/Request/ExecuteGet',
			method: 'GET',
			timeout: AJAX_TIMEOUT,
			data: data,
			success: function (response) {
				AutorizacionesService.data = JSON.parse(response).data;
				//AutorizacionesService.setUnreadCounter();
				callback(AutorizacionesService.data);
			},
			error: function () {
				myApp.alert('Revise la configuración de conexión (tiempo de espera agotado).', 'Servidor no encontrado');
				//$$('#count-autorizaciones').hide();
				callback([]);
			}
		});
	},
	setAsRead: function (entity, cid, entityKey, state, callback) {
		$$.ajax({
			url: 'http://' + PreferenciasService.values.servidor_igglobal + '/States/changeEntityState',
			method: 'POST',
			timeout: AJAX_TIMEOUT,
			headers: {
				requester: true
			},
			data: {
				entity: entity,
				cns: cid,
				entityKey: JSON.stringify(entityKey),
				state: parseInt(state),
				username: PreferenciasService.values.username.toUpperCase()
			},
			success: function (response) {
				myApp.hidePreloader();
				if (callback) callback(JSON.parse(response));
			},
			error: function () {
				myApp.alert('Revise la configuración de conexión (tiempo de espera agotado).', 'Servidor no encontrado');
				myApp.hidePreloader();
			}
		});

	},
	countUnread: function () { },
	setUnreadCounter: function () { },
	getHistory: function (entity, cid, keys, callback) {
		function getQueryString(entity, cid, keys) {
			return '?entity=' + entity + '&cns=' + cid + '&entityKey=' + JSON.stringify(keys) + '&requester=1';
		}
		$$.ajax({
			url: 'http://' + PreferenciasService.values.servidor_igglobal + '/States/historyStates' + getQueryString(entity, cid, keys),
			method: 'GET',
			timeout: AJAX_TIMEOUT,
			data: {
				table: entity,
				cns: cid,
				entityKey: JSON.stringify(keys),
				requester: 1
			},
			success: function (response) {
				if (callback) callback(JSON.parse(response));
			},
			error: function () {
				myApp.alert('Revise la configuración de conexión (tiempo de espera agotado).', 'Servidor no encontrado');

			}
		});
	},
	getAttachments: function (entity, cid, keys, callback) {
		function getQueryString(entity, cid, keys) {
			var keyString = '';
			for (var prop in keys) {
				if (keys.hasOwnProperty(prop)) {
					keyString = keyString + keys[prop] + '-'
				}
			}
			return '?empresa=' + cid + '&tabla=' + entity + '&key=' + keyString;
		}

		$$.ajax({
			url: 'http://' + PreferenciasService.values.servidor_igglobal + '/Attachment/GetAttachments' + getQueryString(entity, cid, keys),
			method: 'GET',
			timeout: AJAX_TIMEOUT,
			success: function (response) {
				if (callback) callback(JSON.parse(response));
			},
			error: function () {
				myApp.alert('Revise la configuración de conexión (tiempo de espera agotado).', 'Servidor no encontrado');

			}
		});
	},
	getNextStates: function (entity, cid, actualState, callback) {
		myApp.showPreloader('Obteniendo...');
		function getQueryString(entity, cid, actualState) {
			return '?userName=' + PreferenciasService.values.username + '&entity=' + entity + '&cns=' + cid + '&ActualState=' + actualState.toString() + '&requester=1';
		}

		$$.ajax({
			url: 'http://' + PreferenciasService.values.servidor_igglobal + '/States/getEntityStatesAvailables' + getQueryString(entity, cid, actualState),
			method: 'GET',
			timeout: AJAX_TIMEOUT,
			success: function (response) {
				myApp.hidePreloader();
				if (callback) callback(JSON.parse(response));
			},
			error: function () {
				myApp.alert('Revise la configuración de conexión (tiempo de espera agotado).', 'Servidor no encontrado');
				myApp.hidePreloader();
			}
		});
	},
	sendState: function (entity, cid, entityKey, state, callback) {
		$$.ajax({
			url: 'http://' + PreferenciasService.values.servidor_igglobal + '/States/changeEntityState',
			method: 'POST',
			timeout: AJAX_TIMEOUT,
			headers: {
				requester: true
			},
			data: {
				entity: entity,
				cns: cid,
				entityKey: JSON.stringify(entityKey),
				state: parseInt(state),
				username: PreferenciasService.values.username.toUpperCase()
			},
			success: function(response) {
				myApp.hidePreloader();
				if(callback) callback(JSON.parse(response));
			},
			error: function() {
				myApp.alert('Revise la configuración de conexión (tiempo de espera agotado).', 'Servidor no encontrado');
				myApp.hidePreloader();
			}
		});
	 }
}