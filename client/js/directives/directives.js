(function () {
	"use strict";
	var directives = ["tooltip", "fileread"];

	var includes = ["angular"];

	var i;
	for (i = 0; i < directives.length; i += 1) {
		includes.push("directives/" + directives[i]);
	}

	define(includes, function (angular) {
		var d = angular.module("seed.directives",[]);

		var i;
		for (i = 0; i < directives.length; i += 1) {
			d.directive(directives[i], arguments[i+1]);
		}

		return d;
	});
})();