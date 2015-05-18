define([
	"angular",
	"angularRoute",
	"controllers/controllers",
	"services/services",
	//"filter/filter",
	"directives/directives"
 	//"models/models"
], function (angular) {
	"use strict";

	return angular.module("seed", ["seed.directives", "seed.services", "seed.controllers"]);
});