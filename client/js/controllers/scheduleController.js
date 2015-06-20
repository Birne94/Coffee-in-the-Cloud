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
                        title: obj.user.first_name + " " + obj.user.last_name + (obj.type == "w" ? " (weekly)" : (obj.type == "b" ? " (biweekly)" : " (other)")),
                        start: obj.date,
                        color: obj.type == "w" ? "#F7464A" : (obj.type == "b" ? "#FDB45C" : "#46BFBD"),
                        allDay: true
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