/**
* Base Controller
**/
(function() {
	"use strict";
	var controllers = ["test"];

	var includes = ["angular"];

	var i;
	for (i = 0; i < controllers.length; i += 1) {
		includes.push("controllers/" + controllers[i] + "Controller");
	}

	define(includes, function (angular) {
		var cons = angular.module("seed.controllers", ["seed.services"]);

		var i;
		for (i = 0; i < controllers.length; i += 1) {
			cons.controller(controllers[i] + "Controller", arguments[i+1]);
		}

		return cons;
	});
})();
