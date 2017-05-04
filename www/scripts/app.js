var notificacionesCtrl = autorizacionesCtrl = preferenciasCtrl = sbNotificaciones = vlNotificaciones = null,
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
	console.log(mainView.activePage.name);
	var currentPage = mainView.activePage.name;
	if (currentPage != 'Notificaciones' && currentPage != 'Autorizaciones' && currentPage != 'Preferencias') {
		mainView.router.back();
	} else {
		navigator.app.exitApp();
	}
}

document.addEventListener('deviceready', function () {
	document.addEventListener("backbutton", onBackKeyDown, false);
	mainView.router.load({
		url: 'pages/template_notificaciones.html',
		animatePages: false
	});

	setDatabase(function () {
		initApp();
	});
})

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
	myApp.closeModal();
}

function initApp() {
	myApp.showPreloader('Obteniendo...');
	//GET de registro de Notification
	NotificacionesCtrl.defaultRangeView();
	AutorizacionesCtrl.defaultRangeView();
	NotificacionesService.getAllForUser(function () {
		NotificacionesCtrl.init();
		AutorizacionesService.getAllForUser(function () { });
		AutorizacionesCtrl.init();
		myApp.hidePreloader();
	})

}

function setDatabase(success, error) {
	success();
}

$$('.open-autorizaciones').on('click', function () {
	var clickedLink = this;
	myApp.popover('.popover-autorizaciones', clickedLink);
});