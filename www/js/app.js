'use strict';
// Ionic Starter App
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'firebase', 'ngCordovaOauth'])

.constant('FireConfig', {
  apiKey: 'AIzaSyADaCoMiJ3BA4F6IKEgVm1DwlEh__3_DJE',
  authDomain: 'voznik.firebaseapp.com',
  databaseURL: 'https://voznik.firebaseio.com',
  storageBucket: 'project-5266200471425252184.appspot.com'
})

.constant('OAUTHs', {
  google: '14791386540-dah9o8e2mnekkb34s19266mrgaevh8mv.apps.googleusercontent.com',
  facebook: '1744011682503469',
  github: 'f0b51334b821109d89f3, ff030739772199584e05726deba1b2308e9b9df1'
})

.run(function($ionicPlatform, FireConfig) {
  // Initialize the Firebase SDK
  firebase.initializeApp(FireConfig);
  //
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      window.StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl',
        resolve: {
          // controller will not be loaded until $requireSignIn resolves
          // Auth refers to our $firebaseAuth wrapper in the factory below
          'currentAuth': function(Auth) {
            // $requireSignIn returns a promise so the resolve waits for it to complete
            // If the promise is rejected, it will throw a $stateChangeError (see above)
            /*return Auth.$requireSignIn();*/

            // $waitForSignIn returns a promise so the resolve waits for it to complete
            return Auth.$waitForSignIn();
          }
        }
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

})

.directive('backImg', function() {
  return function(scope, element, attrs) {
    var url = attrs.backImg;
    element.css({
      'background-image': 'url(' + url + ')',
      'background-size': 'cover',
      'background-position': 'center center'
    });
  };
});
