define(["jquery"], function (jQuery) {
    "use strict";

    function loginController($scope, $rootScope, alerts, service) {
        $rootScope.user = null;
        $rootScope.tally = null;

        $scope.updateUser = function () {
            service.user.check().success(function (result) {
                if (result.status === true) {
                    $rootScope.user = result.user;
                    $rootScope.updateTally();
                } else {
                    $rootScope.user = null;
                }
            });
        };

        $rootScope.updateTally = function () {
            service.tally.status().success(function (result) {
                $rootScope.tally = [];
                $rootScope.user.coffees = 0;

                $(result).each(function (index, entry) {
                    $rootScope.tally.push(entry);
                    $rootScope.user.coffees += entry.amount;
                });
            })
        };

        $scope.login = function(userId) { // TODO
            userId = userId || 1; // Test

            service.user.login(userId).success(function (user) {
                $scope.updateUser();
            }).error(function (data, status, headers, config) {
                // TODO
            });
        };

        $scope.logout = function() {
            service.user.logout().success(function (status) {
                $scope.updateUser();
            });
        };

        $scope.updateUser();
    }

    loginController.$inject = ["$scope", "$rootScope", "seed.alert", "seed.coffeeCloud"];

    return loginController;
});