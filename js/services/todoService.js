(function () {
    'use strict';
    angular.module('todolist')
        .factory('todoService', todoService);

    todoService.$inject = ['$q', '$localStorage'];

    function todoService($q, $localStorage) {

        var service = {
            insert: insert,
            remove: remove,
            clearSelected: clearSelected

        };

        return service;

        // implement services
        function insert(todo) {
            var deferred = $q.defer();
            $localStorage.todos.push(todo);
            deferred.resolve($localStorage.todos);
            return deferred.promise;
        }

        function remove(todo) {
            var deferred = $q.defer();
            $localStorage.todos.splice($localStorage.todos.indexOf(todo), 1);
            deferred.resolve($localStorage.todos);
            return deferred.promise;
        }

        function clearSelected(todos) {
            var deferred = $q.defer();
            var nonSelectedTodos = [];
            todos.forEach(function (todo) {
                if (todo.selected) {
                } else {
                    nonSelectedTodos.push(todo);
                }
            });
            $localStorage.$reset();
            $localStorage.todos = [];
            nonSelectedTodos.forEach(function (todo) {
                $localStorage.todos.push(todo);
            });
            deferred.resolve($localStorage.todos);
            return deferred.promise;
        }


    }

})();