define(["jquery"], function (jQuery) {
    "use strict";

    function pictureloginController($scope, $rootScope, alert, service) {

      $rootScope.tablet = true;

      $scope.tablet_user = null;

      service.user.list().success(function (data) {
        $scope.users = data;
      });

      $scope.select = function(user_id) {
        $scope.tablet_user = user_id;
      }

      $scope.addCoffee = function (user_id, amount) {
        service.tally.addForUser(user_id, amount || 1).success(function (result) {
          $rootScope.updateTally();
          alert.success(amount + (amount == 1 ? " coffee" : " coffees") + " added.");
        }).error(function (result) {
          alert.error("Error adding entry. Please try again later!");
        });
      };

        $scope.blame = function() {
            service.blame();
        }
    }

    pictureloginController.$inject = ["$scope", "$rootScope", "seed.status", "seed.coffeeCloud"];

    return pictureloginController;
});
