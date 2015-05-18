(function () {
    "use strict";
    var services = [
        "alert"
    ];

    var includes = ["angular"];

    var i;
    for (i = 0; i < services.length; i += 1) {
        includes.push("services/" + services[i]);
    }

    define(includes, function (angular) {
        var s = angular.module("seed.services",[]);

        var i;
        for (i = 0; i < services.length; i += 1) {
            s.factory("seed." + services[i], arguments[i+1]);
        }

        return s;
    });
})();
