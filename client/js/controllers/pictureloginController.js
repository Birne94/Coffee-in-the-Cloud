define(["jquery"], function (jQuery) {
    "use strict";

    function pictureloginController($scope, $rootScope, alert, service) {

      $rootScope.tablet = true;
        $scope.schedule = null;
        service.schedule.get().success(function (data) {
            $scope.schedule = data;

            var date=new Date();
            var dd=date.getDate();
            var mm=date.getMonth() + 1;
            var yyyy=date.getFullYear();
            if(mm<10){
                mm="0"+mm;
            };
            if(dd<10){
                dd="0"+dd;
            }
            var today = yyyy+"-"+mm+"-"+dd;

            $.each(data, function (idx, obj) {
                if (today==obj.date){
                    $scope.cleaning=true;
                    $scope.cleaning_message=obj.user.first_name + " " + obj.user.last_name +" have to do the"+ (obj.type == "w" ? " weekly " : (obj.type == "b" ? " biweekly " : " other "))+"cleaning today";
                }
            });
        });
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
