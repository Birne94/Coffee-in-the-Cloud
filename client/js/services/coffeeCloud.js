define(["jquery"], function ($) {
    "use strict";

    var baseUrl = "http://localhost:8000/api/";

    var request = function (method, path, content, content_type) {
        var options = {
            url: baseUrl + path,
            type: method,
            xhrFields: {
                withCredentials: true
            }
        };

        if (content) {
            options.data = content;
        }

        return $.ajax(options).then(function (data) {
            return data;
        });
    };

    var service = function($rootScope) {
        var coffeeCloudServices = {
            user: {
                login: function (userId) {
                    var user_obj = {
                        user_id: userId
                    };
                    return request("POST", "user/login", user_obj).then(function (data) {
                        return data.status;
                    });
                },

                logout: function () {
                    return request("GET", "user/logout").then(function (data) {
                        return data.status;
                    });
                },

                check: function() {
                    return request("GET", "user");
                },

                list: function() {
                    return request("GET", "users");
                }
            },

            tally: {
                status: function() {
                    return request("GET", "tally");
                },

                add: function(amount) {
                    var tally_obj = {
                        amount: amount || 1
                    };
                    return request("POST", "tally/add", tally_obj).then(function (data) {
                        return data.status;
                    });
                }
            }
        }

        return coffeeCloudServices;
    };

    service.$inject = ["$rootScope"];

    return service;
});