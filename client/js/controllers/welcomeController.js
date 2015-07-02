define(["jquery"], function (jQuery) {
    "use strict";

    function welcomeController($scope, $rootScope, alert, service) {
        $rootScope.tablet = false;

        $rootScope.finishedCleaning = function() {
            service.schedule.done().success(function (data) {
                alert.success("Thank you for doing the cleaning!");
                $rootScope.cleaning= false;
            }).error(function (result) {
                alert.error("Cleaning couldn't be marked as done!");
            })
        }
    }



    welcomeController.$inject = ["$scope", "$rootScope", "seed.status", "seed.coffeeCloud"];

    return welcomeController;
});
