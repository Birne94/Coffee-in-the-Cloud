define(["jquery"], function (jQuery) {
    "use strict";

    function testController($scope, $rootScope, alerts, service) {
        $rootScope.testMessage = "It works!";
        $rootScope.clickCount = 0;
        $rootScope.loaded = true;

        $scope.test = function() {
            $rootScope.clickCount++;
        };

        $scope.addCoffee = function (amount) {
            service.tally.add(amount || 1).success(function (result) {
                $rootScope.updateTally();
            });
        }
    }

    testController.$inject = ["$scope", "$rootScope", "seed.alert", "seed.coffeeCloud"];

    return testController;
});