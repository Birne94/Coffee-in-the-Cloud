/**
 * Base Controller and Routes
 **/
(function() {
    "use strict";
    var controllers = ["test", "login"];

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
                    templateUrl : 'views/test.html',
                    controller  : 'testController'
                });
        });

        return cons;
    });
})();
