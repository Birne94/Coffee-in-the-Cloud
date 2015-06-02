define(["jquery"], function (jQuery) {
    "use strict";

    function headerController($scope, $rootScope, $location) {
        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };
    }

    headerController.$inject = ["$scope", "$rootScope", "$location"];

    return headerController;
});