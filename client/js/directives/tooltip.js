define([], function () {
    "use strict";

    function tooltipDirective() {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                $(element).hover(function () {
                    // on mouseenter
                    $(element).tooltip('show');
                }, function () {
                    // on mouseleave
                    $(element).tooltip('hide');
                });
            }
        };
    }

    tooltipDirective.$inject = [];

    return tooltipDirective;
});
