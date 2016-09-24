
angular.module('myApp', ['ngRoute'])
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/view1'});
}])
.controller('MainCtrl',['$scope', function($scope){
    $scope.test = "Hello";
}]);
