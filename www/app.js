
angular.module('myApp', ['ngRoute', 'ngAnimate'])
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/view1'});
}])
.controller('MainCtrl',['$scope','$timeout','$http','$location', function($scope,$timeout,$http,$location){
    $scope.test = "Hello";
    $scope.showIntro = true;
    $scope.showSearch= false;
    $scope.flightArr = [];

    $scope.enterIntro = function() {
        $scope.showIntro = false;
        $timeout(function () {
            $scope.showSearch = true;
        }, 1100);
    }

    $scope.search = function(){
        
        URL = $location.protocol() + '://' + $location.host() + ':' + $location.port();
        $http.get(URL + '/api').then(function(res){
            console.log(res);
            $scope.flightArr = res.data;

        })
    }
}]);
