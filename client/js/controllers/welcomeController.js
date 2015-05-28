define(["jquery"], function (jQuery) {
    "use strict";

    function welcomeController($scope, $rootScope, alert, service) {
      $rootScope.user = null;

    }

    welcomeController.$inject = ["$scope", "$rootScope", "seed.status", "seed.coffeeCloud"];

    return welcomeController;
});
