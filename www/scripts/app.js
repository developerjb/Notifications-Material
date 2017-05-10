var notificacionesCtrl = autorizacionesCtrl = preferenciasCtrl = autenticacionCtrl = sbNotificaciones =
	vlNotificaciones = sbAutorizaciones = vlAutorizaciones = null,
	dbn = new PouchDB('dbNotifications'),
	myApp = new Framework7({
		material: true,
		template7Pages: true,
		precompileTemplates: true
	}),
	$$ = Dom7,
	mainView = myApp.addView('.view-main', {
		domCache: true
	}),
	AJAX_TIMEOUT = 10000;

function onBackKeyDown() {
	//console.log(mainView.activePage.name);
	var currentPage = mainView.activePage.name;
	if (currentPage != 'Notificaciones' && currentPage != 'Autorizaciones' && currentPage != 'Preferencias') {
		mainView.router.back();
	} else {
		navigator.app.exitApp();
	}
}


document.addEventListener('deviceready', function () {
	document.addEventListener("backbutton", onBackKeyDown, false);

	AutenticacionCtrl.init(function (params) {
		//console.log(params);
		if (params) {			
			AutenticacionCtrl.startLogin();
		} else {
			startApp()
		}
	})
})

function startApp() {
	mainView.router.load({
		url: 'pages/template_notificaciones.html',
		animatePages: false
	});
	setDatabase(function () {
		initApp();
	});
}

function loadPageCustom(page) {
	var template = {
		Notificaciones: 'pages/template_notificaciones.html',
		Autorizaciones: 'pages/template_autorizaciones.html',
		Preferencias: 'pages/template_preferencias.html'
	};
	var urlTemplate = true;

	myApp.cache.forEach(function (el) {
		if (el.url == template[page]) {
			urlTemplate = false;
		}
	})

	if (urlTemplate) {
		mainView.router.load({ url: template[page], animatePages: false });
	} else {
		mainView.router.load({ pageName: page, animatePages: false });
	}


	if (page == 'Notificaciones') {
		vlNotificaciones.update();
	}


	if (page == 'Preferencias') {

	}


	myApp.closeModal();
}

myApp.onPageInit('Preferencias', function () {
	$$('#modo_nocturno').change(function () {
		if ($$('#modo_nocturno').prop('checked') == true) {
			$$('body').addClass('layout-dark');
		} else {
			$$('body').removeClass('layout-dark');
		};
	});

	$$('.open-preferencias').on('click', function () {
		var clickedLink = this;
		myApp.popover('.popover-preferencias', clickedLink);
	});


})

function initApp() {
	myApp.showPreloader('Obteniendo...');
	//GET de registro de Notification
	NotificacionesCtrl.defaultRangeView();
	AutorizacionesCtrl.defaultRangeView();
	NotificacionesService.getAllForUser(function () {
		NotificacionesCtrl.init();
		AutorizacionesService.getAllForUser(function () { });
		AutorizacionesCtrl.init();
		AutorizacionCtrl.init();
		myApp.hidePreloader();
	})


}


function setDatabase(success, error) {
	success();
}

// $$('.open-autorizaciones').on('click', function () {
// 	var clickedLink = this;
// 	myApp.popover('.popover-autorizaciones', clickedLink);
// });