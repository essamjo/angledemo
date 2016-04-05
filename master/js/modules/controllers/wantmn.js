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

App.controller('postController', ['$scope', '$http', '$state','$stateParams','wantmnData', function($scope, $http, $state, $stateParams,wantmnData) {

    $scope.loadCategory = function() {

      var categoryJson = 'server/category.json',
          categoryURL  = categoryJson + '?v=' + (new Date().getTime()); // jumps cache
      $http.get(categoryURL)
        .success(function(items) {
           $scope.categoryItems = items;
           if($stateParams.id == null || $stateParams.id == ''){
                console.log('categoryId is null'); 
                $scope._selected = items[0].id;
                $scope.jobs=items[0].subcategory; 
                wantmnData.formdata.categoryId=$scope._selected;

            }else{
                console.log('categoryId is not null');
                $scope._selected = $stateParams.id;
                angular.forEach(items, function(data){
                    console.log(data.id);
                    if($stateParams.id == data.id){
                        $scope.jobs=data.subcategory;
                        wantmnData.formdata.categoryId=$stateParams.id;
                    }else{

                    }
                });
            }

        })
        .error(function(data, status, headers, config) {
          alert('Failure loading category');
        });
    };

    $scope.loadCategory();

    $scope.changeCategory = function(index){
        $scope._selected = index.id;
        $scope.jobs=index.subcategory;
        $state.go('wantmn.chosePost',{id:index.id}); //跳转页面。以保存后退记录
        
    }

    $scope.toSelectAddress=function(index){
        console.log('选择的工作是：'+index.text);
        wantmnData.formdata.jobId=index.id;
        console.log(wantmnData.formdata);
        $state.go('wantmn.selectAddress',{categoryid:wantmnData.formdata.categoryId,jobid:wantmnData.formdata.jobId})
    }

    

}]);


App.controller('wantmnStep2Controller', ['$scope', '$http', '$state','$stateParams','wantmnData',  function($scope, $http, $state, $stateParams,wantmnData) {
      
    $scope.hasAddress=false;
    $scope.loadAddress = function(){
        var addressJson = 'server/address.json',
            addressURL  = addressJson + '?v=' + (new Date().getTime()); // jumps cache
        $http.get(addressURL)
        .success(function(items) {            
            $scope.addressItems = items;   
            if(items.length>0){
                $scope.hasAddress=true;
            }else{
                angular.forEach(items, function(data){
                        if(data.defaultaddress == 1 && wantmnData.formdata.workAddress == null){                           
                            $scope.defaultAddress=data;
                        }else{
                            if(data.id==wantmnData.formdata.workAddress){
                                $scope.defaultAddress=data;                                
                            }
                        }
                });
            }      
        })
        .error(function(data, status, headers, config) {
          alert('Failure loading address');
        });
    }

    $scope.loadAddress();

    

    $scope.selectAddressFn = function (i){
        $scope.defaultAddress=i;
        //$scope.$broadcast("defaultAddress", id);
        $state.go('wantmn.selectAddress',{categoryid:wantmnData.formdata.categoryId,jobid:wantmnData.formdata.jobId,id:i.id});
    }
        
    $scope.toSelectAddress = function (id){
        
        $scope.defaultAddress=id;
        //$scope.$broadcast("defaultAddress", id);
        console.log($scope.defaultAddress);
        $state.go('wantmn.manageAddress');
    }

}]);


App.controller('wantmnManageAddress', ['$scope', '$http', '$state','$stateParams','wantmnData',  function($scope, $http, $state, $stateParams,wantmnData) {
      
    
    $scope.loadAddress = function(){
        var addressJson = 'server/address.json',
            addressURL  = addressJson + '?v=' + (new Date().getTime()); // jumps cache
        $http.get(addressURL)
        .success(function(items) {            
            $scope.addressItems = items;   
            if(items.length>0){
                $scope.hasAddress=true;
            }else{
                angular.forEach(items, function(data){
                        if($state.current.name=='wantmn.selectAddress' && ( $stateParams.id == null || $stateParams.id == '')){
                            if(data.defaultaddress == 1){
                                $scope.defaultAddress=data;
                                //$scope.$broadcast("defaultAddress", data);
                            }
                        }else{
                            if(data.id==$stateParams.id){
                                $scope.defaultAddress=data;
                                //$scope.$broadcast("defaultAddress", data);
                                
                            }
                        }
                });
            }      
        })
        .error(function(data, status, headers, config) {
          alert('Failure loading address');
        });
    }

    $scope.loadAddress();
   

}]);