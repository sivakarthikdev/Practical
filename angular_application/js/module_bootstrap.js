/*var firstApp = angular.module('firstApp', []);
var secondApp = angular.module('secondApp', []);

firstApp.controller('firstController', function($scope) {
	$scope.name = "KARTHIKEYAN";
});

secondApp.controller('secondController', function($scope) {
	$scope.name = "KARTHIKEYAN";
}); */


// Manually bootstrapping each app
/*-----------------------------------------------------
var firstApp = angular.module('firstApp', []);
firstApp.controller('firstController', function($scope) {
	$scope.name = "KARTHIKEYAN";
});

var secondApp = angular.module('secondApp', []);
secondApp.controller('secondController', function($scope) {
	$scope.name = "KARTHIKEYAN SIVA";
});

var divFirst = document.getElementById('container-1');
var divSecond = document.getElementById('container-2');

angular.element(document).ready(function() {
	angular.bootstrap(divFirst, ['firstApp']);
	angular.bootstrap(divSecond, ['secondApp']);
});
 */
 
 //Manually bootstrapping second app
/*var firstApp = angular.module('firstApp', []);
firstApp.controller('firstController', function($scope) {
	$scope.name = "KARTHIKEYAN";
});

var secondApp = angular.module('secondApp', []);
secondApp.controller('secondController', function($scope) {
	$scope.name = "KARTHIKEYAN SIVA";
});

var divSecond = document.getElementById('container-2');

angular.element(document).ready(function() {
	angular.bootstrap(divSecond, ['secondApp']);
}); */

/*var firstApp = angular.module('firstApp', []);
firstApp.controller('firstController', function($scope) {
	$scope.name = "KARTHIKEYAN";
});

angular.element(document).ready(function() {
	angular.bootstrap(document, ['firstApp']);
}); */

var app = angular.module('application', []);

app.controller('applicationContro',['$scope', function($scope) {
	$scope.visible = true;
	$scope.toggle = function() {
		$scope.visible = !$scope.visible;
	}
	$scope.check = true;	
	$scope.firstname = "karthikeyan";
	$scope.value = 1;
	$scope.increment = function() {
		return $scope.value + 1;
	}
	
	$scope.great = "";
	$scope.$watch('great', function() {
		if ($scope.great.length > 0) {
			$scope.greetings = "New Name is : " + $scope.great;
		}
	});
	$scope.$watch(function() { return $scope.great; }, function(newValue, oldValue) { console.log("change detected: " + newValue) });
	
	$scope.value1 = 1;
	$scope.value2 = 5;
}]);
app.controller('nestedController', function($scope) {
	$scope.name = "Nested controller";
});


app.directive('myElement', function() {
	return {
		restrict : 'E',
		link : function(scope, element, attributes) {
			angular.element(element).on("click", function() {
				var ele = element.children()[0];
				angular.element(ele).css('cursor','pointer');
				if (angular.element(ele).text()=="Test") {
					angular.element(ele).text('Karthikeyan');
				} else {
					angular.element(ele).text('Test');
				}
			});
		}
	}
});

