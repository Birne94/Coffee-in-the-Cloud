define(["jquery"], function (jQuery) {
    "use strict";

    /*
    [

    ]
     */

    function tutorialsController($scope, $rootScope, alert, service) {
        $scope.images = [
            /*  0 */ {
                "public/images/tutorial-coffee/step01.jpg": function() { $scope.coffees = 1; },
                "public/images/tutorial-coffee/step02.jpg": function() { $scope.coffees = 2; }
            },
            /*  1 */ ["public/images/tutorial-coffee/step03.jpg", "public/images/tutorial-coffee/step04.jpg"],
            /*  2 */ "public/images/tutorial-coffee/step05.jpg",
            /*  3 */ ["public/images/tutorial-coffee/step06.jpg", "public/images/tutorial-coffee/step07.jpg"],
            /*  4 */ "public/images/tutorial-coffee/step08.jpg",
            /*  5 */ "public/images/tutorial-coffee/step09.jpg",
            /*  6 */ "public/images/tutorial-coffee/step10.jpg",
            /*  7 */ ["public/images/tutorial-coffee/step12.jpg", "public/images/tutorial-coffee/step13.jpg"],
            /*  8 */ "public/images/tutorial-coffee/step14.jpg",
            /*  9 */ {
                "public/images/tutorial-coffee/choice-milk.png": function() {  },
                "public/images/tutorial-coffee/choice-water.png": function() { $scope.step = 16; },
                "public/images/tutorial-coffee/choice-nothing.png": function() { $scope.step = 17; }
            },
            /* 10 */ "public/images/tutorial-coffee/step15.jpg",
            /* 11 */ "public/images/tutorial-coffee/step16.jpg",
            /* 12 */ "public/images/tutorial-coffee/step17.jpg",
            /* 13 */ "public/images/tutorial-coffee/step19.jpg",
            /* 14 */ "public/images/tutorial-coffee/step23.jpg",
            /* 15 */ {"public/images/tutorial-coffee/step24.jpg" : function() { $scope.step = 17; }},
            /* 16 */ "public/images/tutorial-coffee/step25.jpg",
            /* 17 */ "public/images/tutorial-coffee/step26.jpg",
            /* 18 */ "public/images/tutorial-coffee/step27.jpg",
            /* 19 */ "public/images/tutorial-coffee/step28.jpg",
            /* 20 */ "public/images/tutorial-coffee/step29.jpg",
            /* 21 */ "public/images/tutorial-coffee/step31.jpg",
            /* 22 */ "public/images/tutorial-coffee/step30.jpg",
            /* 23 */ "public/images/tutorial-coffee/step22.jpg"
        ];

        $scope.current_image = $scope.images[0];
        $scope.step = -1;
        $scope.coffees = 1;

        $scope.next = function(cb) {
            $scope.step++;

            if (cb) {
                cb();
            }

            var img = $scope.images[$scope.step];
            $scope.choice = false;

            if (Array.isArray(img)) {
                $scope.current_image = { src: img[$scope.coffees-1] };
            } else if (typeof img === 'object') {
                $scope.choice = [];
                for (var src in img) {
                    $scope.choice.push({
                        src: src,
                        cb: img[src]
                    });
                }
            } else {
                $scope.current_image = { src: img };
            }
        };

        $scope.next();
    }

    tutorialsController.$inject = ["$scope", "$rootScope", "seed.status", "seed.coffeeCloud"];

    return tutorialsController;
});