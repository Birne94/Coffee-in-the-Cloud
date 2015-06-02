define(["jquery"], function (jQuery) {
    "use strict";

    function loginController($scope, $rootScope, alert, service, $location) {
        $scope.updateUser = function () {
            service.user.check().success(function (result) {
                if (result.status === true) {
                    $rootScope.user = result.user;
                    $rootScope.updateTally();
                } else {
                    $rootScope.user = null;
                }
            }).error(function (result) {
                alert.error("Error fetching user data.");
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
            }).error(function (result) {
                alert.error("Error fetching tally list data.");
            });
        };

        $scope.login = function(username, password) {
            service.user.login(username, password).success(function (user) {
                $scope.updateUser();

                alert.success("Welcome!");
            }).error(function (data, status, headers, config) {
                alert.error("Login failed.");
            });
        };

        $scope.logout = function() {
            service.user.logout().success(function (status) {
                $scope.updateUser();

                alert.success("Logout succeeded.");
                $location.path("/");
            }).error(function (result) {
                alert.error("Logout failed.");
            });
        };

        $scope.updateUser();
    }

    loginController.$inject = ["$scope", "$rootScope", "seed.status", "seed.coffeeCloud", "$location"];

    return loginController;
});