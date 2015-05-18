define(["jquery"], function (jQuery) {
    "use strict";

    function testController($scope, $rootScope, alerts) {
        $rootScope.testMessage = "It works!";
        $rootScope.loaded = true;
    }

    testController.$inject = ["$scope", "$rootScope", "seed.alert"];

    return testController;
});