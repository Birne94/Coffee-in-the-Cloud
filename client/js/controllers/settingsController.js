define(["jquery"], function (jQuery) {
    "use strict";

    function settingsController($scope, $rootScope, alert, service) {
        $scope.reset = function() {
            $scope.changePassword = false;
            service.settings.get().success(function (result) {
                $scope.settings = result;
            }).error(function (result) {
                alert.error("Error fetching data.");
            });

            service.user.list().success(function (list) {
                $scope.users = list;
            });

            service.balance.get().success(function (result) {
                $scope.balance = result.balance;
            })
        };

        $scope.update = function() {
            if ($scope.settings && $scope.settings.pw_old && $scope.settings.pw_new && $scope.settings.pw_new2) {
                if ($scope.settings.pw_new != $scope.settings.pw_new2) {
                    alert.error("The passwords do not match!");

                    return;
                }
                $scope.settings.pw_new2 = null;
            }
            else {
                $scope.settings.pw_old = null;
                $scope.settings.pw_new = null;
                $scope.settings.pw_new2 = null;
            }

            service.settings.post($scope.settings).success(function (result) {
                $scope.reset();
                $rootScope.$broadcast('updateUser', []);
                alert.success("Settings updated.");
            }).error(function (result) {
                alert.error("Error pushing data.");
            })
        };

        $scope.update_balance = function() {
            if ($scope.balance_amount) {
                service.balance.post($scope.balance_amount, $scope.balance_user).success(function (result) {
                    alert.success("Balance updated!");
                    $scope.reset();
                    $rootScope.$broadcast('updateUser', []);
                }).error(function (result) {
                    alert.error("There was an error processing the data.");
                });
            }
        }

        $scope.reset();
    }


    settingsController.$inject = ["$scope", "$rootScope", "seed.status", "seed.coffeeCloud"];

    return settingsController;
});
