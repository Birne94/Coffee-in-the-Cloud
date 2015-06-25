define(["jquery"], function (jQuery) {
    "use strict";

    function welcomeController($scope, $rootScope, alert, service) {
        $rootScope.tablet = false;
        $scope.schedule = null;
        $rootScope.cleaning = false;
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
                if (today==obj.date && $rootScope.user.id==obj.user.id){
                    $rootScope.cleaning=true;
                    //$scope.cleaner=obj.user.first_name + " " + obj.user.last_name;
                    $scope.cleaning_type = (obj.type == "w" ? " weekly " : (obj.type == "b" ? " biweekly " : " other ")) + " cleaning";
                }
            });
        });

        $rootScope.finishedCleaning = function() {
          $rootScope.cleaning= false;
          alert.success("Thank you for doing the cleaning!");
        }
    }



    welcomeController.$inject = ["$scope", "$rootScope", "seed.status", "seed.coffeeCloud"];

    return welcomeController;
});
