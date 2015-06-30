define(["jquery"], function ($) {
    "use strict";

    var baseUrl = "/api/v1/";

    var service = function($rootScope, $http) {
        $http.defaults.xsrfHeaderName = "X-CSRFToken";
        $http.defaults.xsrfCookieName = "csrftoken";

        function url(path) {
            if (! path.match(/\/$/)) {
                path += "/";
            }

            return baseUrl + path;
        }

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

        function formatDate(date) {
            var date = date.split("-");

            return months[date[1]] + " " + date[0];
        }

        var coffeeCloudServices = {
            user: {
                login: function (email, password) {
                    var user_obj = {
                        email: email,
                        password: password
                    };
                    return $http.post(url("auth/login"), user_obj);
                },

                logout: function () {
                    return $http.post(url("auth/logout"), {});
                },

                check: function() {
                    return $http.get(url("auth/status"));
                },

                list: function() {
                    return $http.get(url("accounts"));
                },

                details: function (user_id) {
                    return $http.get(url("accounts/" + user_id));
                }
            },

            tally: {
                status: function() {
                    return $http.get(url("tally"));
                },

                all: function() {
                    return $http.get(url("tally-all"));
                },

                add: function(amount) {
                    var tally_obj = {
                        amount: amount || 1
                    };
                    return $http.post(url("tally"), tally_obj);
                },

                remove: function (id) {
                    return $http.delete(url("tally/" + id));
                },

                addForUser: function(user_id, amount) {
                    var tally_obj = {
                        amount: amount || 1,
                        user_id: user_id
                    };
                    return $http.post(url("accounts/" + user_id + "/tally"), tally_obj);
                }
            },

            schedule: {
                get: function() {
                    return $http.get(url("schedule"));
                },

                done: function() {
                    return $http.post(url("schedule/done"));
                }
            },

            statistics: {
                all: function() {
                    return $http.get(url("statistics"));
                },

                own: function() {
                    return $http.get(url("statistics/own"));
                },

                type: function() {
                    return $http.get(url("statistics/type"));
                },

                comparison: function() {
                    var deferred = $.Deferred();

                    coffeeCloudServices.statistics.all().success(function (allData) {
                        coffeeCloudServices.statistics.own().success(function (userData) {
                            var result = {
                                labels: [],
                                all: {
                                    data: []
                                },
                                user: {
                                    data: []
                                }
                            };

                            var idxAll = {};
                            var idxUser = {};

                            $(allData).each(function (index, entry) {
                                var date = formatDate(entry.month);
                                idxAll[date] = entry.amount__sum;
                            });
                            $(userData).each(function (index, entry) {
                                var date = formatDate(entry.month);
                                idxUser[date] = entry.amount__sum;
                            });

                            $.each(idxAll, function (index, entry) {
                                result.labels.push(index);
                                result.all.data.push(entry);
                                result.user.data.push(idxUser[index] || 0);
                            });

                            while (result.labels.length < 3) {
                                result.labels.length.push("");
                                result.all.data.push(0);
                                result.user.data.push(0);
                            }

                            deferred.resolve(result);
                        });
                    });

                    return deferred;
                }
            },

            settings: {
                get: function() {
                    return $http.get(url("auth/settings"));
                },
                post: function(settings) {
                    return $http.post(url("auth/settings"), settings);
                },
            },

            balance: {
                get: function() {
                    return $http.get(url("manage/balance"));
                },
                post: function(amount, user) {
                    var obj = {
                        "amount": amount,
                        "user": user
                    };
                    return $http.post(url("manage/balance"), obj);
                },
            },

            blame: function() {
                return $http.post(url("blame"));
            }
        };

        return coffeeCloudServices;
    };

    service.$inject = ["$rootScope", "$http"];

    return service;
});