define(["jquery"], function (jQuery) {
    "use strict";

    var months = {
        "01": "January",
        "02": "February",
        "03": "March",
        "04": "April",
        "05": "May",
        "06": "June",
        "07": "July",
        "08": "August",
        "09": "September",
        "10": "October",
        "11": "November",
        "12": "December"
    };

    function getContext(id) {
        return $("#" + id)[0].getContext("2d");
    }

    function formatDate(date) {
        var date = date.split("-");

        return months[date[1]] + " " + date[0];
    }

    function createDataset(data) {
        var dataset = {
            labels: [],
            datasets: [{
                label: "coffee consumption",
                fillColor: 'rgba(247, 70, 74, 0.2)',
                strokeColor: 'rgba(247, 70, 74, 1)',
                pointColor: 'rgba(247, 70, 74, 1)',
                pointStrokeColor: '#fff',
                pointHighlightFill: '#fff',
                pointHighlightStroke: 'rgba(247, 70, 74, 1)',
                data: []
            }]
        };

        $(data).each(function (index, entry) {
            dataset.labels.push(formatDate(entry.month));
            dataset.datasets[0].data.push(entry.amount__sum);
        });

        return dataset;
    }

    function statisticsController($scope, $rootScope, service) {
        $rootScope.tablet = false;

        if (! $scope.initialized) {
            $scope.initialized = true;

            service.statistics.all().success(function (data) {
                $scope.chartCoffeeConsumption = new Chart(getContext("chartCoffeeConsumption")).Line(createDataset(data), {
                    bezierCurve: false,
                    datasetFill: false,
                    responsive: true
                });
            });

            if ($rootScope.user !== null) {
                service.statistics.own().success(function (data) {
                    $scope.chartCoffeeConsumptionOwn = new Chart(getContext("chartCoffeeConsumptionOwn")).Line(createDataset(data), {
                        bezierCurve: false,
                        datasetFill: false,
                        responsive: true
                    });
                });
            }
        }
    }

    statisticsController.$inject = ["$scope", "$rootScope", "seed.coffeeCloud"];

    return statisticsController;
});
