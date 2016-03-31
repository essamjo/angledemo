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

