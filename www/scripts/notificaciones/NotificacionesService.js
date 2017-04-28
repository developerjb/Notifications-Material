NotificacionesService = {
	data: [],
	convertDate: function (inputFormat) {
		function pad(s) { return (s < 10) ? '0' + s : s; }
		var d = inputFormat;
		return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/');
	},
	formatDateString: function (date, origen, destino) {
		var d = date.split(origen);
		return [d[2], d[1], d[0]].join(destino);
	},
	rangeNotification: {},
	setRangeNotification: function (range) {
		var ranges = this.rangeNotification;
		ranges.DDFecha = range.DDFecha;
		ranges.HHFecha = range.HHFecha;
	},
	deleteRangeNotification: function () {
		var ranges = NotificacionesService.rangeNotification;
		ranges.DDFecha = NotificacionesService.convertDate(new Date());
		ranges.HHFecha = NotificacionesService.convertDate(new Date());
	},
	getRangeNotification: function () {
		return this.rangeNotification;
	},
	selected: null,
	getAllForUser: function (callback, range) {
		var data = {
			id: 'CLO-2',
			Usuario_Id: PreferenciasService.values.usuario_id,
			_userName: PreferenciasService.values.usuario_id,
			_connectionStringId: '-',//PreferenciasService.values.conexion
			hasRange: 1,
			DDFecha: NotificacionesService.rangeNotification.DDFecha,
			HHFecha: NotificacionesService.rangeNotification.HHFecha
		}

		// if(range) {
		// 	data.DDFecha = range.DDFecha;
		// 	data.HHFecha = range.HHFecha;
		// }

		$$.ajax({
			url: 'http://' + PreferenciasService.values.servidor_igglobal + '/Request/ExecuteGet',
			method: 'GET',
			timeout: AJAX_TIMEOUT,
			data: data,
			success: function (response) {
				NotificacionesService.data = JSON.parse(response).data;
				callback(NotificacionesService.data);
			},
			error: function () {
				myApp.alert('Revise la configuración de conexión (tiempo de espera agotado).', 'Servidor no encontrado');
				// $$('#count-notificaciones').hide();
				callback([]);
			}
		});
	},
	setAsRead: function (notificacionId, callback) {
		var _data = {
			id: 'CLO-4',
			Notificacion_Id: notificacionId,
			_userName: PreferenciasService.values.usuario_id,
			_connectionStringId: '-'
		};

		$$.ajax({
			url: 'http://' + PreferenciasService.values.servidor_igglobal + '/Request/ExecuteGet',
			method: 'GET',
			timeout: AJAX_TIMEOUT,
			data: _data,
			success: function (response) {
				if (callback) callback(JSON.parse(response));
			},
			error: function () {
				myApp.alert('Revise la configuración de conexión (tiempo de espera agotado).', 'Servidor no encontrado');
				if (callback) callback({});
			}
		});
	},
	countUnread: function () { },
	setUnreadCounter: function () { }
}