var notificacionesCtrl = autorizacionesCtrl = preferenciasCtrl = sbNotificaciones = vlNotificaciones = null,
	myApp = new Framework7({
		material: true,
		template7Pages: true
	}),
	$$ = Dom7,
	mainView = myApp.addView('.view-main', {
		domCache: true
	}),
	AJAX_TIMEOUT = 10000;

function onBackKeyDown() { 
	console.log(mainView.activePage.name);
	var currentPage = mainView.activePage.name;
	if(currentPage != 'Notificaciones' && currentPage != 'Autorizaciones' && currentPage != 'Preferencias'){
		mainView.router.back();
	}else{
		navigator.app.exitApp();
	}
}

document.addEventListener('deviceready', function () {
	document.addEventListener("backbutton", onBackKeyDown, false);
	mainView.router.load({ pageName: 'Notificaciones' });
	setDatabase(function () {
		initApp();
	});
})

function loadPageCustom(page) {
	mainView.router.load({ pageName: page, animatePages: false});
	if(page == 'Notificaciones'){
		vlNotificaciones.update();
	}
	myApp.closeModal();
}

function initApp() {
	myApp.showPreloader('Obteniendo...');
	//GET de registro de Notification
	NotificacionesCtrl.defaultRangeView();
	NotificacionesService.getAllForUser(function () {
		NotificacionesCtrl.init();
		myApp.hidePreloader();
	})

}

function setDatabase(success, error) {
	success();
}

$$('.open-notificaciones').on('click', function () {
	var clickedLink = this;
	myApp.popover('.popover-notificaciones', clickedLink);
});

$$('.open-autorizaciones').on('click', function () {
	var clickedLink = this;
	myApp.popover('.popover-autorizaciones', clickedLink);
});