define(["jquery"], function (jQuery) {
    "use strict";

    function pictureloginController($scope, $rootScope, alert, service) {

      $rootScope.user = false;
      $rootScope.tablet = false;

      service.user.list().success(function(data){
        $scope.users = data;
      })

      $scope.addCoffee = function (amount) {
          service.tally.add(amount || 1).success(function (result) {
              $rootScope.updateTally();

              alert.success(amount + " added.");
          }).error(function (result) {
              alert.error("Error adding entry. Please try again later!");
          });
      };

    }

    pictureloginController.$inject = ["$scope", "$rootScope", "seed.status", "seed.coffeeCloud"];

    return pictureloginController;
});
