define(["jquery"], function (jQuery) {
    "use strict";

    function scheduleController($scope, $rootScope, alert, service) {

        $rootScope.tablet = false;
        $scope.schedule = null;

        $scope.load = function() {
            service.schedule.get().success(function (data) {
                $scope.schedule = data;

                var events = [];

                $(data).each(function (idx, obj) {
                    events.push({
                        title: obj.user.first_name + " " + obj.user.last_name,
                        start: obj.date
                    });
                });

                $("#calendar").fullCalendar({
                    header: {
                        left: 'prev,next today',
                        center: 'title',
                        right: 'month,agendaWeek,agendaDay'
                    },
                    lang: "en",
                    events: events,
                    timezone: "local"
                });
            });
        };

        $scope.load();

    }

    scheduleController.$inject = ["$scope", "$rootScope", "seed.status", "seed.coffeeCloud"];

    return scheduleController;
});