function sum(a,b){
	var result = [a * b,a + b,a % b,a - b];
	return result;
}


function withoutArg(){
	var i,sum = 0;
	var argulength = arguments.length;
	for(i=0;i<=argulength;i++){
		sum = sum + arguments[i];
		console.log(sum)
	}
	return sum;
}


var test_function = function(){
	return 23;
}
var test_function1 = function(){
	return 24;
}
function addfunction(fun1,fun2){
	return fun1 + fun2;
}
addfunction(test_function(),test_function1())




(function(x){
	return typeof x
})(false)

(function(x){
	return typeof x
})(false)
"boolean"

(function(x){
	return typeof 3
})(false)
"number"

(function(x){
	return typeof 3
})(3)
"number"

(function(x){
	return typeof "karthikeyan"
})(3)
"string"

(function(x){
	return typeof "karthikeyan"
})(true)
"string"

(function(x){
	return typeof 4
})(true)
"number"

(function(x){
	return typeof s
})(true)
"undefined"