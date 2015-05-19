define(["jquery"], function (jQuery) {
    "use strict";

    function loginController($scope, $rootScope, alerts, service) {
        $rootScope.currentUser = null;

        $scope.update = function () {
            service.checkUser().done(function (result) {
                if (result.status === true) {
                    $rootScope.currentUser = result.user;
                } else {
                    $rootScope.currentUser = null;
                }

                $scope.$apply();
            });
        }

        $scope.login = function(userId) {
            userId = userId || 1; // Test

            service.loginUser(userId).done(function (status) {
                if (status === true) {
                    $scope.update();
                }
            });
        };

        $scope.logout = function() {
            service.logoutUser().done(function (status) {
                if (status === true) {
                    $scope.update();
                }
            });
        };

        $scope.update();
    }

    loginController.$inject = ["$scope", "$rootScope", "seed.alert", "seed.coffeeCloud"];

    return loginController;
});