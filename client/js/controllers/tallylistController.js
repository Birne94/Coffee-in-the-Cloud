define(["jquery"], function (jQuery) {
    "use strict";

    function tallylistController($scope, $rootScope, alert, service) {

        $rootScope.tablet = false;

        $scope.addCoffee = function (amount) {
            service.tally.add(amount || 1).success(function (result) {
                $rootScope.updateTally();

                alert.success(amount + " added.");
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

    tallylistController.$inject = ["$scope", "$rootScope", "seed.status", "seed.coffeeCloud"];

    return tallylistController;
});
