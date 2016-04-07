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
        url: '/selectAddress/:categoryid/:jobid/:id',
        title: "选择地址",
        templateUrl: 'app/pages/wmn_selectAddress.html',
        controller: 'selectAddressController'
    })
    .state('wantmn.manageAddress', {
        url: '/manageAddress',
        title: "地址管理",
        templateUrl: 'app/pages/wmn_manageAddress.html',
        controller: 'wantmnManageAddressController'
    })
    .state('wantmn.addAddress', {
        url: '/addAddress',
        title: "增加地址",
        templateUrl: 'app/pages/addAddress.html',
        resolve: helper.resolveFor('baiduMap'),
        controller:'addAddressController'
    })
    .state('wantmn.workType', {
        url: '/workType',
        title: "工作类型",
        templateUrl: 'app/pages/wmn_workType.html',
        resolve: helper.resolveFor('aui-calendar'),
        controller:'wantmnWorTypeController'
    })
    .state('wantmn.workTime', {
        url: '/workTime',
        title: "选择时间",
        templateUrl: 'app/pages/wmn_workTime.html',
        controller:'workTimeController'
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
