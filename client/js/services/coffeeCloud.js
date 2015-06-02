define(["jquery"], function ($) {
    "use strict";

    var baseUrl = "http://localhost:8000/api/v1/";

    var service = function($rootScope, $http) {
        $http.defaults.xsrfHeaderName = "X-CSRFToken";
        $http.defaults.xsrfCookieName = "csrftoken";

        function url(path) {
            if (! path.match(/\/$/)) {
                path += "/";
            }

            return baseUrl + path;
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
                }
            }
        }

        return coffeeCloudServices;
    };

    service.$inject = ["$rootScope", "$http"];

    return service;
});