define(["jquery"], function (jQuery) {
    "use strict";

    function cleaningController($scope) {
      $scope.stepSelected = "myOtherClass";

      $scope.checkAll = function () {
        angular.forEach($scope.cleaningSteps, function (step) {
            step.Selected = "myOtherClass";
        });

      };
      $scope.cleaningSteps = [
        //weekly as filter for biweekly
        {"id": "0.1", "name": "insert blind sieve into porta filter"},
        {"id": "0.2", "name": "add cleaning powder (2tips of a knive)"},
        {"id": "0.3", "name": "5 times rinse circulation"},
        {"id": "0.4", "name": "rinse porta filter with hot water"},
        {"id": "0.5", "name": "5 times rinse circulation"},
        {"id": "0.6", "name": "remove water"},
        {"id": "0.7", "name": "make espresso and pour away"},
        {"id": "0.8", "name": "do weekly cleaning"},
        {"id": "1.1", "name": "open steam wand"},
        {"id": "1.2", "name": "clean steam wand"},
        {"id": "1.3", "name": "clean porta filter"},
        {"id": "1.4", "name": "clean/wipe filter mount"},
        {"id": "1.5", "name": "turn machine off"},
        {"id": "1.6", "name": "empty water sink"},
        {"id": "1.7", "name": "rinse/brush water sink"},
        {"id": "1.8", "name": "turn off mill"},
        {"id": "1.9", "name": "wipe mill"},
        {"id": "1.10", "name": "empty tray"},
        {"id": "1.11", "name": "rinse/brush tray"},
        {"id": "1.12", "name": "clean/wipe machine case"},
        {"id": "1.13", "name": "wipe counter"}
    ];
    $scope.weekly_bi = function weekly_Bi($scope){
      if($scope=="weekly") {
          return "1.";
      }
      else{
          return "";
      }
    };
  }


    cleaningController.$inject = ["$scope", "$rootScope", "$location"];

    return cleaningController;
});
