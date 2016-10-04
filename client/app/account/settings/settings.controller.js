'use strict';

var errorHandler;

angular.module('signUpApp')
  .controller('SettingsCtrl', function($scope, $state, $stateParams, User, Auth) {
    $scope.errors = {};

    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.user = User.query();

    $scope.editUser = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.editUser($scope.user.name, $scope.user.email)
          .then(function() {
            $scope.message = 'User profile successfully changed.';
          })
          .catch(function() {
            $scope.message = '';
          });
      }

      $state.go('settings');
    };

    $scope.changePassword = function(form) {
      $scope.submitted = true;
      if (form.$valid) {
        Auth.changePassword($scope.user.oldPassword, $scope.user.newPassword)
          .then(function() {
            $scope.message = 'Password successfully changed.';
          })
          .catch(function() {
            form.password.$setValidity('mongoose', false);
            $scope.errors.other = 'Incorrect password';
            $scope.message = '';
          });
      }
    };
  });


  errorHandler = function($scope) {
    return function error(httpResponse) {
      $scope.errors = httpResponse;
    };
  };
