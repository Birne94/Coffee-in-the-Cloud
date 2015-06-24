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

    function createConsumptionDataset(data) {
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

    function createComparisonDataset(data) {
        var dataset = {
            labels: data.labels,
            datasets: [
                {
                    label: "total",
                    fillColor: "rgba(253, 180, 92,0.2)",
                    strokeColor: "rgba(253, 180, 92,1)",
                    pointColor: "rgba(253, 180, 92,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "rgba(255, 200, 112, 1)",
                    pointHighlightStroke: "rgba(255, 200, 112,1)",
                    data: data.all.data
                },
                {
                    label: "own",
                    fillColor: "rgba(247,70,74,0.2)",
                    strokeColor: "rgba(247,70,74,1)",
                    pointColor: "rgba(247,70,74,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "rgba(255,90,94,1)",
                    pointHighlightStroke: "rgba(255,90,94,1)",
                    data: data.user.data
                }
            ]
        };

        return dataset;
    }

    function createTypeDataset(data) {
        var colors = [
            { color: '#F7464A', highlight: '#FF5A5E' },
            { color: '#FDB45C', highlight: '#FFC870' },
            { color: '#46BFBD', highlight: '#5AD3D1' },
            { color: '#949FB1', highlight: '#A8B3C5' },
        ];
        var dataset = [];

        $(data).each(function (index, entry) {
            var title = {
                1: "single",
                2: "double"
            }[entry.amount];

            if (title) {
                dataset.push({
                    value: entry.amount__count,
                    label: title,
                    color: colors[index].color,
                    highlight: colors[index].highlight
                });
            }
        });

        return dataset;
    }

    function statisticsController($scope, $rootScope, service) {
        $rootScope.tablet = false;

        

        if (! $scope.initialized) {
            $scope.initialized = true;

            service.statistics.all().success(function (data) {
                $scope.chartCoffeeConsumption = new Chart(getContext("chartCoffeeConsumption")).Line(createConsumptionDataset(data), {
                    bezierCurve: false,
                    datasetFill: false,
                    responsive: true
                });
            });

            service.statistics.type().success(function (data) {
                $scope.chartCoffeeType = new Chart(getContext("chartCoffeeType")).Doughnut(createTypeDataset(data), {
                    responsive: true
                });
            });

            if ($rootScope.user !== null) {
                service.statistics.comparison().then(function (data) {
                    $scope.chartCoffeeComparison = new Chart(getContext("chartCoffeeComparison")).Radar(createComparisonDataset(data), {
                        responsive: true,
                        multiTooltipTemplate: "<%if (datasetLabel){%><%=datasetLabel%>: <%}%><%= value %>",
                    });
                });

                service.statistics.own().success(function (data) {
                    $scope.chartCoffeeConsumptionOwn = new Chart(getContext("chartCoffeeConsumptionOwn")).Line(createConsumptionDataset(data), {
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
