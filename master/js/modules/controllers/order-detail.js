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
