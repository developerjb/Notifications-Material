AutorizacionesService = {
	data: [],
	selected: null,
	getAllForUser: function (callback, range) { 
		var data = {
			id: 'CLO-8',
			Usuario_Id: PreferenciasService.values.usuario_id,
			_userName: PreferenciasService.values.usuario_id,
			_connectionStringId: '-',//PreferenciasService.values.conexion
			hasRange: 1
		}
		
		if(range) {
			data.DDFecha = range.DDFecha;
			data.HHFecha = range.HHFecha;
		}
		
		//todas las notificaciones que sean de módulo 'WF', ya que fueron insertadas como solicitud de respuesta de un workflow.
		$$.ajax({
			url: 'http://' + PreferenciasService.values.servidor_igglobal + '/Request/ExecuteGet',
			method: 'GET',
			timeout: AJAX_TIMEOUT,
			data: data,
			success: function(response) {
				AutorizacionesService.data = JSON.parse(response).data;
				//AutorizacionesService.setUnreadCounter();
				callback(AutorizacionesService.data);
			},
			error: function() {
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