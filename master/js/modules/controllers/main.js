/**=========================================================
 * Module: main.js
 * Main Application Controller
 =========================================================*/

App.controller('AppController',
  ['$rootScope', '$scope', '$state',  '$window', '$localStorage', '$timeout', 
  function($rootScope, $scope, $state, $window, $localStorage, $timeout) {
    "use strict";

 

  


    // iPad may presents ghost click issues
    // if( ! browser.ipad )
      // FastClick.attach(document.body);

   
   
    // cancel click event easily
    $rootScope.cancel = function($event) {
      $event.stopPropagation();
    };

}]);
