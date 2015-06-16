define(["jquery"], function (jQuery) {
    "use strict";

    function cleaningController($scope) {
            $scope.cleaningSteps = [
                //weekly as filter for biweekly
                {"id": "0.1", "name": "insert blind sieve into porta filter", "bi":"biweekly"},
                {"id": "0.2", "name": "add cleaning powder (2tips of a knive)", "bi":"biweekly"},
                {"id": "0.3", "name": "5 times rinse circulation", "bi":"biweekly"},
                {"id": "0.4", "name": "rinse porta filter with hot water", "bi":"biweekly"},
                {"id": "0.5", "name": "5 times rinse circulation", "bi":"biweekly"},
                {"id": "0.6", "name": "remove water", "bi":"biweekly"},
                {"id": "0.7", "name": "make espresso and pour away", "bi":"biweekly"},
                {"id": "0.8", "name": "do weekly cleaning", "bi":"biweekly"},
                {"id": "1.1", "name": "oupen steam wand", "bi":"every week"},
                {"id": "1.2", "name": "clean steam wand", "bi":"every week"},
                {"id": "1.3", "name": "clean porta filter", "bi":"every week"},
                {"id": "1.4", "name": "clean/wipe filter mount", "bi":"every week"},
                {"id": "1.5", "name": "turn machine off", "bi":"every week"},
                {"id": "1.6", "name": "empty water sink", "bi":"every week"},
                {"id": "1.7", "name": "rinse/brush water sink", "bi":"every week"},
                {"id": "1.8", "name": "turn off mill", "bi":"every week"},
                {"id": "1.9", "name": "wipe mill", "bi":"every week"},
                {"id": "1.10", "name": "empty tray", "bi":"every week"},
                {"id": "1.11", "name": "rinse/brush tray", "bi":"every week"},
                {"id": "1.12", "name": "clean/wipe machine case", "bi":"every week"},
                {"id": "1.13", "name": "wipe counter", "bi":"every week"}
            ]
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