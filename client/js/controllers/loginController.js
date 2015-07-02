define(["jquery"], function (jQuery) {
    "use strict";

    function loginController($scope, $rootScope, alert, service, $location) {
      service.tally.all().success(function (result) {

        var users = {};

        $(result).each(function(index, entry) {

          users[entry.user.id] = (users[entry.user.id] || 0) + entry.amount;

        });

        var maxValue = 0;
        $rootScope.maxUser = [];

        $.each(users, function(key, value) {
          if (value > maxValue) {
            maxValue = value;
            $rootScope.maxUser = [parseInt(key)];
          }
          else if (value == maxValue) {
            $rootScope.maxUser.push(parseInt(key));
          }
        });
      });

        $scope.updateUser = function () {
            service.user.check().success(function (result) {
                if (result.status === true) {
                    $rootScope.user = result.user;
                    $rootScope.permissions = result.permissions;
                    $rootScope.updateTally();
                } else {
                    $rootScope.user = null;
                    $rootScope.permissions = null;
                }

        	$scope.schedule = null;
	        $rootScope.cleaning = false;

            service.schedule.get().success(function (data) {
                $scope.schedule = data;

                var date = new Date();
                var dd = date.getDate();
                var mm = date.getMonth() + 1;
                var yyyy = date.getFullYear();
                if (mm < 10) {
                    mm = "0" + mm;
                }
                ;
                if (dd < 10) {
                    dd = "0" + dd;
                }
                var today = yyyy + "-" + mm + "-" + dd;

                $.each(data, function (idx, obj) {
                    if (today == obj.date && $rootScope.user.id == obj.user.id && !obj.done) {
                        $rootScope.cleaning = true;
                        //$scope.cleaner=obj.user.first_name + " " + obj.user.last_name;
                        $scope.cleaning_type = (obj.type == "w" ? " weekly " : (obj.type == "b" ? " biweekly " : " other ")) + " cleaning";
                    }
                });
            });
            }).error(function (result) {
                alert.error("Error fetching user data.");
            });
        };

        $rootScope.$on('updateUser', $scope.updateUser);

        $rootScope.updateTally = function () {
            service.tally.status().success(function (result) {
                $rootScope.tally = [];
                $rootScope.user.coffees = 0;

                $(result).each(function (index, entry) {
                    $rootScope.tally.push(entry);
                    $rootScope.user.coffees += entry.amount;
                });
            }).error(function (result) {
                alert.error("Error fetching tally list data.");
            });
        };

        $scope.login = function(username, password) {
            service.user.login(username, password).success(function (user) {
                $scope.updateUser();

                alert.success("Welcome!");
            }).error(function (data, status, headers, config) {
                alert.error("Login failed.");
            });
        };

        $scope.logout = function(redirect) {
            service.user.logout().success(function (status) {
                $scope.updateUser();
                if (redirect){
                alert.success("Logout succeeded.");
                $location.path("/");
                }
            }).error(function (result) {
                if(redirect)
                  alert.error("Logout failed.");
            });
        };

        $scope.updateUser();
    }

    loginController.$inject = ["$scope", "$rootScope", "seed.status", "seed.coffeeCloud", "$location"];

    return loginController;
});
