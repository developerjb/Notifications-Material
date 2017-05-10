AutenticacionService = {
	token: {},
	login: function(dto, callback) {
		
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
			success: function(response) {
				if(response.code.toString() != '0') {
					if(callback) callback(false);
				} else {
					 //callback(true);
					dto.i18n = response.data.translatedForms;
					AutenticacionService.setLoggedIn(dto, '', callback);				
				}
				
			},
			error: function() {
				myApp.alert('Revise la configuración de conexión (tiempo de espera agotado).', 'Servidor no encontrado');
				if(callback) callback(false);
			}
		});
	},
	setLoggedIn: function(dto, token, callback) {
		dbn.get('nLogin')
				.then(function(doc){
					//callback(false);
				}).catch(function (err) {
  				if(err.status == 404){
						dto._id = 'nLogin'; 
						//dto.translatedForms
						console.log(dto);
						PreferenciasService.values = dto;
						dbn.put(dto).then(function(resp){
								callback(true);
						});
					}
				});


		// db = window.sqlitePlugin.openDatabase({name: 'igglobal.notifications.db', key: 'base321+', location: 'default'});
		// db.transaction(function(tx) {
	  //   var query1 = "INSERT INTO Preferencias VALUES (?,?,?,?,?,?)";
    //   tx.executeSql(query1, [dto.username, dto.servidor_igglobal, false, false, false, null]);
	  //   query2 = 'INSERT INTO Token VALUES (?,?,?,?)';
	  //   tx.executeSql(query2, [new Date(), null, null, null]);
	  // }, function(error) {
	  //   alert('Fatal: error setting token.');
	  //   alert(error.message);
	  //   if(callback) callback(false);
	  // }, function() {
	  //   AutenticacionService.token = {
		// 		username: dto.username
		// 	};
			
		// 	PreferenciasService.values = {
		// 		usuario_id: dto.username,
		// 		servidor_igglobal: dto.servidor_igglobal,
		// 		modo_nocturno: false
		// 		//confirmar_touchid: false,
		// 		//confirmar_pin: false,
		// 		//conexion: null
		// 	};
			
	  //   if(callback) callback(true);
	  // });		
	},
	isLoggedIn: function(callback) {
			dbn.get('nLogin')
				.then(function(doc){
					PreferenciasService.values = doc;
					callback(false);
				}).catch(function (err) {
  				callback(true);
				});

			// db.get('login').then(function(doc) {
			// 	return db.remove(doc);
			// }).then(function (result) {

			// }).catch(function (err) {
			// 	console.log(err);
			// });


		// db = window.sqlitePlugin.openDatabase({name: 'igglobal.notifications.db', key: 'base321+', location: 'default'});
		// db.executeSql("SELECT * FROM Token", [], function (resultSet) {
		// 	var row = resultSet.rows.item(0);
		// 	if (resultSet.rows.length == 0) {
		// 		callback(false);
		// 		return;
		// 	}
		// 	//verificar si el token expiró o no.
		// 	//verifica si ya hay un token válido almacenado previamente en el dispositivo.
		// 	callback(true);
		// }, function(error) {
		// 	alert(error.message);
		// 	callback(false);
		// });
	},
	logout: function(callback) {
		db = window.sqlitePlugin.openDatabase({name: 'igglobal.notifications.db', key: 'base321+', location: 'default'});
		db.transaction(function(tx) {
	    tx.executeSql('DELETE FROM Token');
	    tx.executeSql('DELETE FROM Preferencias');
	  }, function(error) {
	    alert('Fatal: error loggin off.');
	    alert(error.message);
	  }, function() {
	    if(callback) callback();
	  });		
	}
}