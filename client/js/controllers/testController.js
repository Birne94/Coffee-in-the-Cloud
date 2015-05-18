define(["jquery"], function (jQuery) {
    "use strict";

    function testController($scope, $rootScope, alerts) {
        $rootScope.testMessage = "It works!";
        $rootScope.clickCount = 0;
        $rootScope.loaded = true;

        $scope.test = function() {
            $rootScope.clickCount++;
        };
    }

    testController.$inject = ["$scope", "$rootScope", "seed.alert"];

    return testController;
});