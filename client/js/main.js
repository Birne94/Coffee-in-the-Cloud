/*if (window.location.href.indexOf("file:///") === 0) {
	var base = window.location.href.replace("file://", "");
	base = base.replace(/\#\!(.*)/g, "");
	document.getElementsByTagName("base")[0].setAttribute("href", base);
}*/

requirejs.config({
	paths: {
		jquery: "bower_components/jquery/dist/jquery",
		angular: "bower_components/angular/angular",
		angularRoute: "bower_components/angular-route/angular-route",
		bootstrap: "bower_components/bootstrap/dist/js/bootstrap",
		alertify: "bower_components/alertify/alertify",
		fullcalendar: "bower_components/fullcalendar/dist/fullcalendar",
		moment: "bower_components/moment/min/moment.min",
		chart: "bower_components/Chart.js/Chart.min"
	},
	baseUrl: "js",
    shim: {
        "angular": {
            deps: ["jquery"],
            exports: "angular"
        },
        "angularRoute":{
            deps:["angular"]
        },
        "bootstrap":{
            deps:["jquery"]
        },
		"fullcalendar":{
			deos:["jquery", "moment"]
		}

    },
    /*
	shim: {
		"angular" : {"exports" : "angular"},
		"angularMocks": {deps:["angular"], "exports":"angular.mock"}
	},*/
	priority: [
		"angular"
	]
});

requirejs( [
	"jquery",
	"angular",
	"app",
	"bootstrap",
	"fullcalendar",
	"chart"
], function($, angular, app) {
	"use strict";
	$(document).ready(function () {
		var $html = $("html");
		angular.bootstrap($html, [app.name]);
		// Because of RequireJS we need to bootstrap the app app manually
		// and Angular Scenario runner won"t be able to communicate with our app
		// unless we explicitely mark the container as app holder
		// More info: https://groups.google.com/forum/#!msg/angular/yslVnZh9Yjk/MLi3VGXZLeMJ
		$html.addClass("ng-app");

		$(document).ready(function () {
			$('[data-toggle="tooltip"]').tooltip()
		});

	});
});
