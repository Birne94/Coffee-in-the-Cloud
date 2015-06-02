define(["jquery"], function (jQuery) {
    "use strict";

    function welcomeController($scope, $rootScope) {
        $rootScope.tablet = false;
    }

    welcomeController.$inject = ["$scope", "$rootScope"];

    return welcomeController;
});
