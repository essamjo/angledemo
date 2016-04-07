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


App.controller('selectAddressController', ['$scope', '$http', '$state','$stateParams','wantmnData',  function($scope, $http, $state, $stateParams,wantmnData) {
    
    $scope.worktype=wantmnData.formdata.workType;  
    $scope.hasAddress=false;
    $scope.loadAddress = function(){
        var addressJson = 'server/address.json',
            addressURL  = addressJson + '?v=' + (new Date().getTime()); // jumps cache
        $http.get(addressURL)
        .success(function(items) {            
            $scope.addressItems = items;   
            if(items.length>0){
                $scope.hasAddress=true;
            }
                angular.forEach(items, function(data){
                        if(data.defaultaddress == 1 && wantmnData.formdata.workAddress == null){        
                            console.log("默认地址")                   
                            $scope.defaultAddress=data;
                        }else{
                            if(data.id==wantmnData.formdata.workAddress){
                                console.log("选择其他地址")
                                $scope.defaultAddress=data;                                
                            }
                        }
                });
               
        })
        .error(function(data, status, headers, config) {
          alert('Failure loading address');
        });
    }

    $scope.loadAddress();    

   
    if(wantmnData.formdata.workType==1){
        $scope.worktypetext= "驻场"
    }else{
        $scope.worktypetext= "远程"
    }
    
      
    $scope.toSelectAddress = function (item){
        
        $scope.defaultAddress=item;
        wantmnData.formdata.workAddress=item.id;      
        $state.go('wantmn.manageAddress');
    }

    $scope.toSelectWorktype = function(){
        $state.go('wantmn.workType');
    }

    $scope.toSelectWorkTime = function(){
        if(!$scope.hasAddress){
            return
        }else{
            $state.go('wantmn.workTime');
        }
    }

}]);


App.controller('wantmnManageAddressController', ['$scope', '$http', '$state','$stateParams','wantmnData',  function($scope, $http, $state, $stateParams,wantmnData) {
      
    $scope._selectedItem=wantmnData.formdata.workAddress;
    $scope.loadAddress = function(){
        var addressJson = 'server/address.json',
            addressURL  = addressJson + '?v=' + (new Date().getTime()); // jumps cache
        $http.get(addressURL)
        .success(function(items) {            
            $scope.addressItems = items; 
            angular.forEach(items, function(data){
                        if(data.defaultaddress == 1 && wantmnData.formdata.workAddress == null){        
                            $scope._selectedItem=data.id
                        }
                });
        })
        .error(function(data, status, headers, config) {
          alert('Failure loading address');
        });
    }

    $scope.loadAddress();
   
    $scope.selectAddressFn = function (i){
        $scope.defaultAddress=i;
        //$scope.$broadcast("defaultAddress", id);
        wantmnData.formdata.workAddress=i.id;
        $state.go('wantmn.selectAddress',{categoryid:wantmnData.formdata.categoryId,jobid:wantmnData.formdata.jobId,id:i.id});
    }
    $scope.toAddAddress = function(){        
            $state.go('wantmn.addAddress');
    }

}]);



App.controller('wantmnWorTypeController', ['$scope', '$http', '$state','$stateParams','wantmnData',  function($scope, $http, $state, $stateParams,wantmnData) {
    $scope.worktypeItems=[{
        id:1,
        text:"驻场"
    },{
        id:2,
        text:"远程"
    }
    ];
    $scope._selectedItem=wantmnData.formdata.workType;
    $scope.selectworktype=function(item){
        wantmnData.formdata.workType=item.id;
        console.log(wantmnData.formdata.workType);
        $state.go('wantmn.selectAddress',{categoryid:wantmnData.formdata.categoryId,jobid:wantmnData.formdata.jobId})
    }

}]);


App.controller('addAddressController', ['$scope', '$http', '$state','$stateParams','wantmnData',  function($scope, $http, $state, $stateParams,wantmnData) {
      

}]);

App.controller('workTimeController', ['$scope', '$http', '$state','$stateParams','wantmnData',  function($scope, $http, $state, $stateParams,wantmnData) {

    $scope.worktime=1;
    $scope.workStartDate=null;
    $scope.choseArr=[];//选择的时间段 id 数组

    //创建工作天数
    var arr={};
    $scope.workTimeItems=[]; 
    for(i=1;i<31;i++){
        arr={"id":i,"value":i+"天"};
        $scope.workTimeItems.push(arr)
    };

    //工作时段
    $scope.worktimetypeItems=[
        {"id":1,"value":"工作日白天"},
        {"id":2,"value":"工作日晚上"},
        {"id":3,"value":"周末白天"},
        {"id":4,"value":"周末晚上"}
        ]
  
    
    $scope.toOrder = function(){
        $scope.choseArr=[];
        angular.forEach(angular.element('.selected'),function(data){
            
            $scope.choseArr.push(angular.element(data).attr('mnb-data'));

        })
        console.log($scope.choseArr)
        wantmnData.formdata.workStartDate=$scope.workStartDate;
        wantmnData.formdata.workTimeType=$scope.choseArr;
        wantmnData.formdata.workTime=$scope.worktiem;
        console.log(wantmnData.formdata)
    }


}]);