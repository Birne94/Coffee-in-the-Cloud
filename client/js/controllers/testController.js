define(["jquery"], function (jQuery) {
    "use strict";

    function testController($scope, $rootScope, alert, service) {
        $rootScope.testMessage = "It works!";
        $rootScope.clickCount = 0;
        $rootScope.loaded = true;

        $scope.test = function() {
            $rootScope.clickCount++;
        };

        $scope.addCoffee = function (amount) {
            service.tally.add(amount || 1).success(function (result) {
                $rootScope.updateTally();

                alert.success("Entry added.");
            }).error(function (result) {
                alert.error("Error adding entry. Please try again later!");
            });
        };

        $scope.removeCoffee = function (id) {
            service.tally.remove(id).success(function (result) {
                $rootScope.updateTally();

                alert.success("Entry removed.");
            }).error(function (result) {
                alert.error("Error removing entry.");
            })
        }
    }

    testController.$inject = ["$scope", "$rootScope", "seed.status", "seed.coffeeCloud"];

    return testController;
});