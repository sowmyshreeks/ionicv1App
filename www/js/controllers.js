angular.module('starter.controllers', [])

.controller('homeCtrl', function($scope, $location, myService, $http) {
$scope.search= {};

$scope.submit = function() {

    console.log($scope.search);
    var req = {
            method: 'GET',
            url: "http://192.168.0.13:8080/getMembersByFilter",
            params:$scope.search,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }

        }
            $http(req).then(function(res) {
            console.log(res);
            if (res.data.data.length) {
                myService.set(res.data.data);
                 $location.path('/search');
            } else {
                console.log('no matchs found');
            }

            
        }, function() {
            console.log('error occured');
        })


       
}
})

.factory('myService', function() {
    var savedData;
    function set(data) {
        console.log(data);
        savedData = data;
    }
    function get() {
        return savedData;
    }
    function setprofile(data) {
        console.log(data);
        savedData = data;
    }
    function getprofile() {
        return savedData;
    }

    return {
        set: set,
        get: get,
        setprofile: setprofile,
        getprofile: getprofile

    }
})

.controller('searchCtrl', function($scope, $location, myService) {
    $scope.names=myService.get();
    /*
  $scope.names = [
                    "VenkataNarayana",
                    "Deepak",
                    "Gopal",
                    "PrabhaShankar",
                    "Palani",
                 ]*/

                 $scope.display = function(names) {
                     console.log(names);
                     myService.setprofile(names);
        $location.path('/display');
}

 $scope.back = function() {
        $location.path('/home');
}
})


.controller('displayCtrl', function($scope, $location,myService) {

$scope.detail={};

$scope.detail=myService.getprofile();
    console.log($scope.detail);
    

     $scope.back = function() {
        $location.path('/search');
}
    })