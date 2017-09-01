(function () {
    'use strict';
    angular.module('todolist')
        .controller('TodoCtrl', function TodoCtrl($scope, $filter, $localStorage, todoService) {
            if (!angular.isDefined($localStorage.todos)) {
                $localStorage.todos = [];
            }
            $scope.todos = $localStorage.todos;
            $scope.newTodo = '';

            $scope.addTodo = function () {
                var newTodo = {
                    title: $scope.newTodo.trim(),
                    selected: false
                };

                if (!newTodo.title) {
                    return;
                }

                todoService.insert(newTodo)
                    .then(function success() {
                        $scope.newTodo = '';
                        $scope.todos = $localStorage.todos;
                    })
                    .finally(function () {
                    });
            };

            $scope.removeTodo = function (todo) {
                todoService.remove(todo);
            };

            $scope.toggleSelected = function (todo, selected) {
                if (angular.isDefined(selected)) {
                    todo.selected = selected;
                }
                $scope.updateSelectedStatus();
            };

            $scope.updateSelectedStatus = function () {
                $scope.hasSelectedItem = false;
                $scope.todos.forEach(function (todo) {
                    if (todo.selected) {
                        $scope.hasSelectedItem = true;
                    }
                });
            };

            $scope.clearSelectedTodos = function () {
                todoService.clearSelected($scope.todos)
                    .then(function success(res) {
                        $scope.newTodo = '';
                        $scope.todos = res;
                        $scope.updateSelectedStatus();
                    })
                    .finally(function () {
                    });
            };

            $scope.selectAll = function (selected) {
                $localStorage.todos.forEach(function (todo) {
                    if (todo.selected !== selected) {
                        $scope.toggleSelected(todo, selected);
                    }
                });
            };
        });
})();