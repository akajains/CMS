﻿var MessageController;

MessageController = [
  "$scope", "Message", function($scope, Message) {
    $scope.$parent.title = '留言板';
    $scope.$parent.showBanner = false;
    $scope.loading = true;
    $scope.entity = {};
    $scope.entity.Author = $scope.User.UserName;
    $scope.entity.Email = $scope.User.Email;
    $scope.entity.Url = $scope.User.Url;
    $scope.AuthorForDisplay = $scope.User.UserName;
    $scope.editmode = $scope.User.UserName === '' || !($scope.User.UserName != null);
    $scope.list = Message.query({
      $filter: 'IsDeleted eq false'
    }, function() {
      var item, _i, _len, _ref;
      _ref = $scope.list.value;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        if (item.Email) {
          item.Gravatar = 'http://www.gravatar.com/avatar/' + md5(item.Email);
        } else {
          item.Gravatar = '/Content/img/avatar.png';
        }
      }
      return $scope.loading = false;
    });
    $scope.save = function() {
      $scope.submitting = true;
      $scope.entity.BoardId = UUID.generate();
      return Message.save($scope.entity, function(data) {
        message.success("Message has been submitted.");
        $scope.list.value.unshift(data);
        $scope.entity.Content = "";
        $scope.AuthorForDisplay = data.Author;
        $scope.editmode = false;
        angular.resetForm($scope, 'form');
        return $scope.submitting = false;
      });
    };
    return $scope.remove = function(item) {
      return Message.remove({
        id: "(guid'" + item.BoardId + "')"
      }, function() {
        item.IsDeleted = true;
        return message.success("Message has been removed.");
      });
    };
  }
];
