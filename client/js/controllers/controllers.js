/**
 * Base Controller and Routes
 **/
(function() {
    "use strict";
    var controllers = ["test", "login", "welcome", "schedule", "picturelogin", "tallylist", "header"];

    var includes = ["angular"];

    var i;
    for (i = 0; i < controllers.length; i += 1) {
        includes.push("controllers/" + controllers[i] + "Controller");
    }

    define(includes, function (angular) {
        var cons = angular.module("seed.controllers", ["seed.services", "ngRoute"]);

        var i;
        for (i = 0; i < controllers.length; i += 1) {
            cons.controller(controllers[i] + "Controller", arguments[i+1]);
        }

        cons.config(function ($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl : 'views/welcome.html',
                    controller  : 'welcomeController'
                })
                .when('/schedule/', {
                    templateUrl: 'views/schedule.html',
                    controller: 'scheduleController'
                })
                .when('/tablet/', {
                  templateUrl: 'views/picture-login.html',
                  controller: 'pictureloginController'
                })
                .when('/tallylist/', {
                  templateUrl: 'views/tallylist.html',
                  controller: 'tallylistController'
                })
                .otherwise({
                    redirectTo: '/'
                });
        });

        cons.filter("parseDate", function() {
            return function (value) {
                return new Date(value).toLocaleString();
            }
        });
        return cons;
    });
})();
