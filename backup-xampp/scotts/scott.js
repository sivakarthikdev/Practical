var mainApp = angular.module("mainApp",['ngRoute']);
mainApp.controller("menuController",['$scope','$http',function($scope,$http){
	$scope.menus = null;
	$http.get('header.json').success(function(data){
		$scope.menus = data;
	}).error(function(){
		alert('Server is busy');
	});
}]);


mainApp.config(function($routeProvider){
	$routeProvider.when('/',{
		templateUrl : 'home.html',
		controller  : 'mainController'
	}).when('/home',{
		templateUrl : 'home.html',
		controller  : 'mainController'
	}).when('/brands',{
		templateUrl : 'brands.html',
		controller : 'brandsController'
	})
});
/*mainApp.config(['$routeProvider',function($routeProvider){
	$routeProvider.when('/',{
		templateUrl : 'brands.html',
		controller : 'brandsController'
	}).when('/brands',{
		templateUrl : 'brands.html',
		controller : 'brandsController'
	}).otherwise ({
		redirectTo: '/'
	});
}]);*/	

mainApp.controller("mainController",function($scope){
	$scope.message = "Home page";
	$scope.transitionState = "active"
});

mainApp.controller("brandsController",['$scope','$http',function($scope,$http){
	$http.get('brands.json').success(function(data){
		$scope.contents = data;
	}).error(function(){
		alert('Server is busy');
	});
	$scope.transitionState = "active";
}]);



