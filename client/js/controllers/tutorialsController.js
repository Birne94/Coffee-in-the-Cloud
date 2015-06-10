define(["jquery"], function (jQuery) {
    "use strict";

    function tutorialsController($scope, $rootScope, alert, service) {
        $scope.step = 0;
        $scope.coffees = 0;
        $scope.milk = 0;

        $scope.next = function(coffees) {
            if (coffees) {
                $scope.coffees = coffees;
            }
            $scope.step++;
        };

        $scope.set = function(step) {
            $scope.step = step;
        };

        $scope.milk = function(milk) {
            $scope.milk = milk;
            $scope.next();
        };
    }

    tutorialsController.$inject = ["$scope", "$rootScope", "seed.status", "seed.coffeeCloud"];

    return tutorialsController;
});