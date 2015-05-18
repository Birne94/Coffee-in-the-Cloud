(function() {
'use strict';

angular.module('coffeeCloud')
  .config(['$routeProvider', function($routeProvider) {

    $routeProvider
     // home page
      .otherwise('/tallylist');


    //$locationProvider.html5Mode(true);

  }]);

  })();
