define(["jquery"], function ($) {
    "use strict";

    var service = function($rootScope) {

        function status (class_name, message) {
            var id = Math.random().toString(16).slice(2, 10);
            var obj = jQuery("<div/>", {
                id: id,
                class: "alert alert-" + class_name + " fade in",
                html: '<button data-dismiss="alert" class="close" type="button" aria-hidden="true"><i class="fa fa-times"></i></button>' + message
            });
            obj.appendTo("#status");

            window.setTimeout("$('#" + id + "').remove()", 2000);

            return obj;
        }

        var statusService = {
            info: function (message) {
                return status("info", message);
            },
            success: function (message) {
                return status("success", message);
            },
            warning: function (message) {
                return status("warning", message);
            },
            error: function (message) {
                return status("danger", message);
            },
        };

        return statusService;
    };

    service.$inject = ["$rootScope"];

    return service;
});