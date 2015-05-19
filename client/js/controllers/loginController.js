define(["jquery"], function (jQuery) {
    "use strict";

    function loginController($scope, $rootScope, alerts, service) {
        $rootScope.user = null;
        $rootScope.tally = null;

        $scope.updateUser = function () {
            service.user.check().done(function (result) {
                if (result.status === true) {
                    $rootScope.user = result.user;
                    $rootScope.updateTally();
                } else {
                    $rootScope.user = null;
                }

                $scope.$apply();
            });
        };

        $rootScope.updateTally = function () {
            service.tally.status().done(function (result) {
                if (result.status === true) {
                    $rootScope.tally = result.coffees;
                    $rootScope.user.coffees = result.coffee_count;
                } else {
                    $rootScope.tally = null;
                    $rootScope.user.coffees = null;
                }

                $scope.$apply();
            })
        };

        $scope.login = function(userId) {
            userId = userId || 1; // Test

            service.user.login(userId).done(function (status) {
                if (status === true) {
                    $scope.updateUser();
                }
            });
        };

        $scope.logout = function() {
            service.user.logout().done(function (status) {
                if (status === true) {
                    $scope.updateUser();
                }
            });
        };

        $scope.updateUser();
    }

    loginController.$inject = ["$scope", "$rootScope", "seed.alert", "seed.coffeeCloud"];

    return loginController;
});