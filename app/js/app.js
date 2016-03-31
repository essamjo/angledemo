/*!
 * 
 * Angle - Bootstrap Admin App + AngularJS
 * 
 * Author: @themicon_co
 * Website: http://themicon.co
 * License: http://support.wrapbootstrap.com/knowledge_base/topics/usage-licenses
 * 
 */

if (typeof $ === 'undefined') { throw new Error('This application\'s JavaScript requires jQuery'); }

// APP START
// ----------------------------------- 

var App = angular.module('mnb', [
    'ngRoute',
    'ngAnimate',
    'ngStorage',
    'ui.router',
    'ng-iscroll',
    'oc.lazyLoad'
  ]);

App.run(["$rootScope", "$state", "$stateParams",  '$window', '$templateCache', function ($rootScope, $state, $stateParams, $window, $templateCache) {
  // Set reference to access them from any scope
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
  $rootScope.$storage = $window.localStorage;

  // Uncomment this to disable template cache
  /*$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
      if (typeof(toState) !== 'undefined'){
        $templateCache.remove(toState.templateUrl);
      }
  });*/

  // Scope Globals
  // ----------------------------------- 
  $rootScope.app = {
    name: '码农帮',
    description: '互联网兼职预约神器',
    year: ((new Date()).getFullYear()),
    layout: {
      isFixed: true,
      isCollapsed: false,
      isBoxed: false,
      isRTL: false,
      horizontal: false,
      isFloat: false,
      asideHover: false,
      theme: null
    },
    useFullLayout: false,
    hiddenFooter: false,
    viewAnimation: 'ng-fadeInUp'
  };
    //Hook start
    $rootScope.$on('$stateChangeStart',
      function(event, unfoundState, fromState, fromParams) {

      });
    // Hook not found
    $rootScope.$on('$stateNotFound',
      function(event, unfoundState, fromState, fromParams) {
          console.log(unfoundState.to); // "lazy.state"
          console.log(unfoundState.toParams); // {a:1, b:2}
          console.log(unfoundState.options); // {inherit:false} + default options
      });
    // Hook error
    $rootScope.$on('$stateChangeError',
      function(event, toState, toParams, fromState, fromParams, error){
        console.log(error);
      });
    // Hook success
    $rootScope.$on('$stateChangeSuccess',
      function(event, toState, toParams, fromState, fromParams) {
        // display new view from top
        $window.scrollTo(0, 0);
        // Save the route title
        $rootScope.currTitle = $state.current.title;

        var $body = $('body')
        document.title = $state.current.title;
        // hack在微信等webview中无法修改document.title的情况
         var $iframe = $('<iframe src="/favicon.ico"></iframe>').on('load', function() {
           setTimeout(function() {
             $iframe.off('load').remove()
           }, 0)
         }).appendTo($body)
      });
    $rootScope.currTitle = $state.current.title;
    $rootScope.pageTitle = function() {
      var title = $rootScope.app.name + ' - ' + ($rootScope.currTitle || $rootScope.app.description);
      document.title = title;
      console.log('title====='+title);
      return title;
    };


}]);

/**=========================================================
 * Module: config.js
 * App routes and resources configuration
 =========================================================*/

App.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', 'RouteHelpersProvider',
function ($stateProvider, $locationProvider, $urlRouterProvider, helper) {
  'use strict';

  // Set the following to true to enable the HTML5 Mode
  // You may have to set <base> tag in index and a routing configuration in your server
  $locationProvider.html5Mode(false);

  // defaults to dashboard
  $urlRouterProvider.otherwise('/page/index');

  // 
  // Application Routes
  // -----------------------------------   
  $stateProvider
    .state('page', {
        url: '/page',
        templateUrl: 'app/pages/page.html'
    })
    .state('page.index', {
        url: '/index',
        title: "首页",
        templateUrl: 'app/pages/index.html'
    })
    .state('page.order', {
        url: '/order',
        title: "我的订单",
        templateUrl: 'app/pages/order.html',
        resolve: helper.resolveFor('iScroll')
    })
    .state('page.myinfo', {
        url: '/myinfo',
        title: "我的",
        templateUrl: 'app/pages/myinfo.html'
    })
    .state('page.login', {
        url: '/login',
        title: "Login",
        templateUrl: 'app/pages/login.html'
    })
    .state('page.register', {
        url: '/register',
        title: "Register",
        templateUrl: 'app/pages/register.html'
    })
    .state('page.recover', {
        url: '/recover',
        title: "Recover",
        templateUrl: 'app/pages/recover.html'
    })
    .state('wantmn', {
        url: '/wantmn',
        title: "发布需求",
        templateUrl: 'app/pages/wantmn.html'
    })
    .state('wantmn.chosePost', {
        url: '/chosePost/:id',
        title: "选择岗位",
        templateUrl: 'app/pages/wmn_chosePost.html',
        resolve: helper.resolveFor('iScroll')
    })
    .state('wantmn.selectAddress', {
        url: '/selectAddress',
        title: "选择地址",
        templateUrl: 'app/pages/wmn_selectAddress.html'
    })
    .state('wantmn.manageAddress', {
        url: '/manageAddress',
        title: "地址管理",
        templateUrl: 'app/pages/wmn_manageAddress.html'
    })
    .state('wantmn.peopleTime', {
        url: '/peopleTime',
        title: "选择时间",
        templateUrl: 'app/pages/wmn_peopleTime.html',
        resolve: helper.resolveFor('aui-calendar')
    })
    .state('wantmn.confirmorder', {
        url: '/confirmorder',
        title: "确定订单",
        templateUrl: 'app/pages/wmn_confirmorder.html'
    })
    .state('wantmn.changePeople', {
        url: '/changePeople',
        title: "选择牛人",
        templateUrl: 'app/pages/wmn_changePeople.html'
    })
    .state('wantmn.toPay', {
        url: '/toPay',
        title: "确认支付",
        templateUrl: 'app/pages/wmn_toPay.html'
    })
    .state('wantmn.payCallback', {
        url: '/payCallback',
        title: "预约状态",
        templateUrl: 'app/pages/wmn_payCallback.html'
    })
    .state('orderdetail', {
        url: '/orderdetail',
        title: "订单详情",
        templateUrl: 'app/pages/order-detail.html'
    })
    .state('orderdetail.status', {
        url: '/status',
        title: "订单状态",
        templateUrl: 'app/pages/order-detail-status.html',
        resolve: helper.resolveFor('iScroll')
    })
    .state('orderdetail.info', {
        url: '/info',
        title: "订单信息",
        templateUrl: 'app/pages/order-detail-info.html'
    })
    .state('page.404', {
        url: '/404',
        title: "Not Found",
        templateUrl: 'app/pages/404.html'
    })
    // 
    // CUSTOM RESOLVES
    //   Add your own resolves properties
    //   following this object extend
    //   method
    // ----------------------------------- 
    // .state('app.someroute', {
    //   url: '/some_url',
    //   templateUrl: 'path_to_template.html',
    //   controller: 'someController',
    //   resolve: angular.extend(
    //     helper.resolveFor(), {
    //     // YOUR RESOLVES GO HERE
    //     }
    //   )
    // })
    ;


}]).config(['$ocLazyLoadProvider', 'APP_REQUIRES', function ($ocLazyLoadProvider, APP_REQUIRES) {
    'use strict';

    // Lazy Load modules configuration
    $ocLazyLoadProvider.config({
      debug: false,
      events: true,
      modules: APP_REQUIRES.modules
    });

}]).config(['$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
    function ( $controllerProvider, $compileProvider, $filterProvider, $provide) {
      'use strict';
      // registering components after bootstrap
      App.controller = $controllerProvider.register;
      App.directive  = $compileProvider.directive;
      App.filter     = $filterProvider.register;
      App.factory    = $provide.factory;
      App.service    = $provide.service;
      App.constant   = $provide.constant;
      App.value      = $provide.value;

}])
;

/**=========================================================
 * Module: constants.js
 * Define constants to inject across the application
 =========================================================*/
App
  .constant('APP_COLORS', {
    'primary':                '#5d9cec',
    'success':                '#27c24c',
    'info':                   '#23b7e5',
    'warning':                '#ff902b',
    'danger':                 '#f05050',
    'inverse':                '#131e26',
    'green':                  '#37bc9b',
    'pink':                   '#f532e5',
    'purple':                 '#7266ba',
    'dark':                   '#3a3f51',
    'yellow':                 '#fad732',
    'gray-darker':            '#232735',
    'gray-dark':              '#3a3f51',
    'gray':                   '#dde6e9',
    'gray-light':             '#e4eaec',
    'gray-lighter':           '#edf1f2'
  })
  .constant('APP_MEDIAQUERY', {
    'desktopLG':             1200,
    'desktop':                992,
    'tablet':                 768,
    'mobile':                 480
  })
  .constant('APP_REQUIRES', {
    // jQuery based and standalone scripts
    scripts: {
      'animate':            ['vendor/animate.css/animate.min.css'],
      'aui-calendar':       ['vendor/aui-calendar/aui-calendar.css',
                             'vendor/aui-calendar/aui-calendar.js',
                             'vendor/aui-calendar/aui-tap.js'],
      'iScroll':            ['vendor/iScroll/iScroll.js']
     
    },
    // Angular based script (use the right module name)
    modules: [
      {name: 'toaster',                   files: ['vendor/angularjs-toaster/toaster.js',
                                                 'vendor/angularjs-toaster/toaster.css']}
    ]
  })
;
/**=========================================================
 * Module: access-login.js
 * Demo for login api
 =========================================================*/

App.controller('LoginFormController', ['$scope', '$http', '$state', function($scope, $http, $state) {

  // bind here all data from the form
  $scope.account = {};
  // place the message if something goes wrong
  $scope.authMsg = '';

  $scope.login = function() {
    $scope.authMsg = '';

    if($scope.loginForm.$valid) {

      $http
        .post('api/account/login', {email: $scope.account.email, password: $scope.account.password})
        .then(function(response) {
          // assumes if ok, response is an object with some data, if not, a string with error
          // customize according to your api
          if ( !response.account ) {
            $scope.authMsg = 'Incorrect credentials.';
          }else{
            $state.go('app.dashboard');
          }
        }, function(x) {
          $scope.authMsg = 'Server Request Error';
        });
    }
    else {
      // set as dirty if the user click directly to login so we show the validation messages
      $scope.loginForm.account_email.$dirty = true;
      $scope.loginForm.account_password.$dirty = true;
    }
  };

}]);

/**=========================================================
 * Module: access-register.js
 * Demo for register account api
 =========================================================*/

App.controller('RegisterFormController', ['$scope', '$http', '$state', function($scope, $http, $state) {

  // bind here all data from the form
  $scope.account = {};
  // place the message if something goes wrong
  $scope.authMsg = '';
    
  $scope.register = function() {
    $scope.authMsg = '';

    if($scope.registerForm.$valid) {

      $http
        .post('api/account/register', {email: $scope.account.email, password: $scope.account.password})
        .then(function(response) {
          // assumes if ok, response is an object with some data, if not, a string with error
          // customize according to your api
          if ( !response.account ) {
            $scope.authMsg = response;
          }else{
            $state.go('app.dashboard');
          }
        }, function(x) {
          $scope.authMsg = 'Server Request Error';
        });
    }
    else {
      // set as dirty if the user click directly to login so we show the validation messages
      $scope.registerForm.account_email.$dirty = true;
      $scope.registerForm.account_password.$dirty = true;
      $scope.registerForm.account_agreed.$dirty = true;
      
    }
  };

}]);

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

/**
 * 
 * @authors Zhou Guanqing (essamjo@163.com)
 * @date    2016-03-29 15:12:48
 * @version $Id$
 */


App.controller('orderDetailController', ['$scope', '$http', '$state', function($scope, $http, $state) {

    $scope.$parent.myScrollOptions = {
        'wrapper': {
            snap: false,
            click: true,
            onScrollStart:function(){
                alert('start scroll');
            },
            onScrollEnd: function ()
            {
                alert('finshed scrolling wrapper');
        }},
    };

}]);

/**
 * 
 * @authors Zhou Guanqing (essamjo@163.com)
 * @date    2016-03-28 15:51:31
 * @version $Id$
 */

App.controller('orderListController', ['$scope', '$http', '$state', function($scope, $http, $state) {

    $scope.$parent.myScrollOptions = {
        'wrapper': {
            snap: false,
            click: true,
            onScrollEnd: function ()
            {
                alert('finshed scrolling wrapper');
        }},
    };
    console.log('orderListController');
}]);

/**
 * 
 * @authors Zhou Guanqing (essamjo@163.com)
 * @date    2016-03-31 16:17:30
 * @version $Id$
 */

App.controller('wantmnController', ['$scope', '$http', '$state', function($scope, $http, $state) {
      
    $scope.$parent.myScrollOptions = {
        'wrapper': {
            snap: false,
            click: true,
            onScrollEnd: function ()
            {
                alert('finshed scrolling wrapper');
        }},
    };

}]);

App.controller('postController', ['$scope', '$http', '$state','$stateParams', function($scope, $http, $state, $stateParams) {

     
    console.log($stateParams.id);   
    $scope.loadCategory = function() {

      var categoryJson = 'server/category.json',
          categoryURL  = categoryJson + '?v=' + (new Date().getTime()); // jumps cache
      $http.get(categoryURL)
        .success(function(items) {
           $scope.categoryItems = items;
           console.log(items);
        })
        .error(function(data, status, headers, config) {
          alert('Failure loading menu');
        });
     };

     $scope.loadCategory();
     console.log('$stateParams.id==='+$stateParams.id);
     if($stateParams.id == null || $stateParams.id == ''){
         //if($stateParams.id in $scope.categoryItems){
            console.log('id is null');
            $('.postFirst li').addClass('cur')
         //}
     }else{
        console.log('id is not null');
     }
}]);


/**=========================================================
 * Module: helpers.js
 * Provides helper functions for routes definition
 =========================================================*/

App.provider('RouteHelpers', ['APP_REQUIRES', function (appRequires) {
  "use strict";

  // Set here the base of the relative path
  // for all app views
  this.basepath = function (uri) {
    return 'app/pages/' + uri;
  };

  // Generates a resolve object by passing script names
  // previously configured in constant.APP_REQUIRES
  this.resolveFor = function () {
    var _args = arguments;
    return {
      deps: ['$ocLazyLoad','$q', function ($ocLL, $q) {
        // Creates a promise chain for each argument
        var promise = $q.when(1); // empty promise
        for(var i=0, len=_args.length; i < len; i ++){
          promise = andThen(_args[i]);
        }
        return promise;

        // creates promise to chain dynamically
        function andThen(_arg) {
          // also support a function that returns a promise
          if(typeof _arg == 'function')
              return promise.then(_arg);
          else
              return promise.then(function() {
                // if is a module, pass the name. If not, pass the array
                var whatToLoad = getRequired(_arg);
                // simple error check
                if(!whatToLoad) return $.error('Route resolve: Bad resource name [' + _arg + ']');
                // finally, return a promise
                return $ocLL.load( whatToLoad );
              });
        }
        // check and returns required data
        // analyze module items with the form [name: '', files: []]
        // and also simple array of script files (for not angular js)
        function getRequired(name) {
          if (appRequires.modules)
              for(var m in appRequires.modules)
                  if(appRequires.modules[m].name && appRequires.modules[m].name === name)
                      return appRequires.modules[m];
          return appRequires.scripts && appRequires.scripts[name];
        }

      }]};
  }; // resolveFor

  // not necessary, only used in config block for routes
  this.$get = function(){
    return {
      basepath: this.basepath
    }
  };

}]);


// To run this code, edit file 
// index.html or index.jade and change
// html data-ng-app attribute from
// angle to myAppName
// ----------------------------------- 

var myApp = angular.module('myAppName', ['mnb']);

myApp.run(["$log", function($log) {

  $log.log('I\'m a line from custom.js');

}]);

myApp.config(["RouteHelpersProvider", function(RouteHelpersProvider) {

  // Custom Route definition
  
}]);

myApp.controller('oneOfMyOwnController', ["$scope", function($scope) {
  /* controller code */
}]);

myApp.directive('oneOfMyOwnDirectives', function() {
  /*directive code*/
});

myApp.config(["$stateProvider", function($stateProvider /* ... */) {
  /* specific routes here (see file config.js) */
}]);