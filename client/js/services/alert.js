define(["jquery"], function ($) {
	"use strict";

	var service = function($rootScope) {

		function Alert(type, message) {
			this.type = type;
			this.message = message;
			this.step = "";
		}

		Alert.prototype.advance = function(step) {
			this.step = step;

			// Since we want to notify the user about the current status,
			// we make sure Angular updates the alert right away.
			if (!$rootScope.$root.$$phase) {
				$rootScope.$apply();
			}
		};

		$rootScope.alerts = [];

		var alertServices = {
			status: function(message) {
				var alert = new Alert("status", message);
				$rootScope.alerts.push(alert);

				// Important: no $apply here!
				// Angular does this automatically when an action is triggered
				// from a controller etc.

				return alert;
			},
			error: function(message) {
				var alert = new Alert("error", message);
				window.setTimeout(function() {
					alertServices.remove(alert);
				}, 5000);
				$rootScope.alerts.push(alert);
				$rootScope.$apply();
				return alert;
			},
			message: function(message) {
				var alert = new Alert("message", message);
				window.setTimeout(function() {
					alertServices.remove(alert);
				}, 5000);
				$rootScope.alerts.push(alert);
				$rootScope.$apply();
				return alert;
			},
			remove: function(alert) {
				var filtered = $.grep($rootScope.alerts, function(element) {
					return element !== alert;
				});
				$rootScope.alerts = filtered;
				$rootScope.$apply();
			}
		};

		return alertServices;
	};

	service.$inject = ["$rootScope", "$timeout"];

	return service;
});
