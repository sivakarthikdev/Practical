var myApp = angular.module('myApp',[]);
myApp.controller('menuController',function($scope,$window){
	$scope.activeMenu = true;
	var resizeWindow = angular.element($window);
	resizeWindow.bind('resize',function(){
		if($window.innerWidth > 480 && angular.element('#nav-menus').hasClass('ng-hide')){
			angular.element('#nav-menus').removeClass('ng-hide');
		}
	});
});

