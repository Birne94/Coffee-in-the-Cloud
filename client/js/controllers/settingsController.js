define(["jquery"], function (jQuery) {
    "use strict";

    function settingsController($scope, $rootScope, alert, service) {
        $scope.reset = function() {
            service.settings.get().success(function (result) {
                $scope.settings = result;
            }).error(function (result) {
                alert.error("Error fetching data.");
            })
        };

        $scope.update = function() {
            service.settings.post($scope.settings).success(function (result) {
                $scope.reset();
                alert.success("Settings updated.");
            }).error(function (result) {
                alert.error("Error pushing data.");
            })
        }

        $scope.reset();
    }


    settingsController.$inject = ["$scope", "$rootScope", "seed.status", "seed.coffeeCloud"];

    return settingsController;
});
