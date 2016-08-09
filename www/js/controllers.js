'use strict';
angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, Auth, OAUTHs, $cordovaOauth) {
  $scope.login = function(authMethod) {
    var scoup = ['email'];
    // if (authMethod === 'github') {
    //   authOpts = _.join(['github', OAUTHs.github.id, OAUTHs.github.secret]);
    // } else {
    //   authOpts = _.join([OAUTHs[authMethod]]);
    // }
    $cordovaOauth[authMethod](OAUTHs[authMethod], scoup).then(function(result) {
      var provider = _.capitalize(authMethod) + 'AuthProvider';
      var cred = firebase.auth[provider].credential(authMethod === 'google' ? result.id_token : result.access_token);
      Auth.$signInWithCredential(cred).then(function(authData) {
        console.log(authData);
      }).catch(function(error) {
        console.error(error);
      });
    }, function(error) {
      console.error('OAuth Error -> ' + error);
    });
  };

  $scope.logout = function () {
    Auth.$signOut();
  };

  Auth.$onAuthStateChanged(function(authData) {
    if (authData === null) {
      console.warn('Not logged in yet');
      delete $scope.authData;
    } else {
      console.log('Logged in as', authData.uid);
      // $scope.authData = authData; // This will display the user's name in our view
      $scope.authData = _.groupBy(authData.providerData, function (item) { // group auth providers
        var p = _.split(item.providerId, '.');
        return p[0];
      });
    }
  });
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope, $state, currentAuth, $ionicPopup) {
  // currentAuth (provided by resolve) will contain the authenticated user or null if not signed in
  if (!currentAuth) {
    $ionicPopup.alert({
      title: 'Auth Warning',
      template: 'You\'re not logged in!'
    }).then(function () {
      $state.go('tab.dash');
    });
  }
  //
  $scope.settings = {
    enableFriends: true
  };
});
