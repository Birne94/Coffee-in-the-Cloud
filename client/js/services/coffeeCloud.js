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
            loginUser: function (userId) {
                var user_obj = {
                    user_id: userId
                };
                return request("POST", "user/login", user_obj).then(function (data) {
                    return data.status;
                });
            },

            logoutUser: function () {
                return request("POST", "user/logout").then(function (data) {
                    return data.status;
                });
            },

            checkUser: function() {
                return request("POST", "user");
            }
        };

        return coffeeCloudServices;
    };

    service.$inject = ["$rootScope"];

    return service;
});