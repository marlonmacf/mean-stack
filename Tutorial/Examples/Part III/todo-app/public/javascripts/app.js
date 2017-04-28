angular.module('app', ['ngRoute'])

    .factory('Todos', ['$http', function ($http) {
        return $http.get('/todos');
    }])

    .controller('TodoController', ['$scope', 'Todos', function ($scope, Todos) {
        Todos.success(function (data) {
            $scope.todos = data;
        }).error(function (data, status) {
            console.log(data, status);
            $scope.todos = [];
        });
    }])

    .controller('TodoDetailCtrl', ['$scope', '$routeParams', 'Todos', function ($scope, $routeParams, Todos) {
        $scope.todo = Todos[$routeParams.id];
    }])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/todos.html',
                controller: 'TodoController'
            })

            .when('/:id', {
                templateUrl: '/todoDetails.html',
                controller: 'TodoDetailCtrl'
            });
    }]);