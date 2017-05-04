AutorizacionesService = {
	data: [],
	selected: null,
	rangeAutorizacion: {},
	convertDate: function (inputFormat) {
		function pad(s) { return (s < 10) ? '0' + s : s; }
		var d = inputFormat;
		return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/');
	},
	getAllForUser: function (callback, range) {
		var self = this;
		var data = {
			id: 'CLO-8',
			Usuario_Id: 'JEFE', //PreferenciasService.values.usuario_id,
			_userName: 'JEFE',//PreferenciasService.values.usuario_id,
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
	setAsRead: function () { },
	countUnread: function () { },
	setUnreadCounter: function () { },
	getHistory: function () { },
	getAttachments: function () { },
	getNextStates: function () { },
	sendState: function () { }
}