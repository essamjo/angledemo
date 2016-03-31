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
