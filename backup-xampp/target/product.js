var shirtblock = angular.module("shirtBlocks",[]);
shirtblock.controller("shirtController",function($scope){
	/* Right side Content block */
	$scope.productObjs = obj;
	$scope.sort_prices = "price";
	
	/* Left block - category list */
	$scope.categoryObj = obj;
	var arr = ["small","medium","large"];
	$scope.count = 0;
	for(i=0;i<=arr.length;i++){
		angular.forEach(obj,function(value,key){
			if($.inArray(arr[i],value.sizes)!=-1){
				$scope.count+=1;
			}
			if($.inArray(i,value.ratings)!=-1){
				$scope.rating+=1;
			}
		});
		if(arr[i]==arr[0]){
			$scope.small = $scope.count;
			$scope.count = 0;
		}else if(arr[i]==arr[1]){
			$scope.medium = $scope.count;
			$scope.count = 0;
		}else{
			$scope.large = $scope.count;
		}
	}
	
	
	$scope.rating = 0;
	$scope.updateObject = [];
	for(i=1;i<=5;i++){
		angular.forEach(obj,function(value,key){
			if(i==value.ratings){
				$scope.rating+=1;
			}
		});
		$scope.updateObject.push($scope.rating)
		$scope.rating = 0;
	}
	$scope.updateObject
	
	//Filter small size shirt list 
	$scope.small_check = function($event){
		var type = $(event.target).attr('data-type');
		//console.log($scope.type)
		$scope.productObjs = [];
		if($scope.smallCheck){
			angular.forEach(obj,function(value,key){
				if($.inArray(arr[0],value.sizes)!=-1){
					$scope.productObjs.push(value)
				}
			});
		}
		else{
			$scope.productObjs = obj;
		}
	}
	$scope.medium_check = function($event){
		var type = $(event.target).attr('data-type');
		$scope.productObjs = [];
		if($scope.mediumCheck){
			angular.forEach(obj,function(value,key){
				if($.inArray(arr[1],value.sizes)!=-1){
					$scope.productObjs.push(value)
				}
			});
		}
		else{
			$scope.productObjs = obj;
		}
	}
	$scope.large_check = function($event){
		var type = $(event.target).attr('data-type');
		$scope.productObjs = [];
		if($scope.largeCheck){
			angular.forEach(obj,function(value,key){
				if($.inArray(arr[2],value.sizes)!=-1){
					$scope.productObjs.push(value)
				}
			});
		}
		else{
			$scope.productObjs = obj;
		}
	}
	$(document).on('change','.rating_products input',function(){
		$scope.productObjss = [];
		if($(this).is(':checked')){
			var rate = $(this).val();
			angular.forEach(obj,function(value,key){
				if(rate==value.ratings){
					$scope.productObjss.push(value)
					$scope.productObjs = $scope.productObjss
				}
			});
		}else{
			$scope.productObjs = obj;
		}
	});
});


