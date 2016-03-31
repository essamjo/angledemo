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

    
    // console.log($stateParams.id);   
    $scope.loadCategory = function() {

      var categoryJson = 'server/category.json',
          categoryURL  = categoryJson + '?v=' + (new Date().getTime()); // jumps cache
      $http.get(categoryURL)
        .success(function(items) {
           $scope.categoryItems = items;
           if($stateParams.id == null || $stateParams.id == ''){
                $scope._selected = items[0].id;
                console.log('id is null');   

            }else{
                $scope._selected = $stateParams.id;
                console.log('id is not null');
            }

        })
        .error(function(data, status, headers, config) {
          alert('Failure loading category');
        });
     };

    $scope.loadCategory();

    $scope.changeCategory = function(index){
        $scope._selected = index.id;
        console.log(index);
        $('.secPost').html('');
    }

    //console.log('$stateParams.id==='+$stateParams.id);

    

}]);

