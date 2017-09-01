(function () {
    'use strict';
    angular.module('todolist', ['ngRoute', 'ngStorage'])
        .config(function ($routeProvider) {
            'use strict';

            var routeConfig = {
                controller: 'TodoCtrl',
                templateUrl: 'todolist-index.html',
                resolve: {}
            };

            $routeProvider
                .when('/', routeConfig)
                .otherwise({
                    redirectTo: '/'
                });
        });

})();