﻿var GlobalController;

GlobalController = [
  "$scope", "$http", "$location", '$window', "Channel", function($scope, $http, $location, $window, Channel) {
    $http.get("/admin/getuser").success(function(data) {
      if (data.Email) {
        data.Gravatar = 'http://www.gravatar.com/avatar/' + md5(data.Email);
      } else {
        data.Gravatar = '/Content/img/avatar.png';
      }
      return $scope.User = data;
    });
    Channel.categories(function(data) {
      return $scope.Channels = data.value;
    });
    return $scope.search = function() {
      return $window.location.href = "/#!/search/" + $scope.key;
    };
  }
];
