(function (angular) {

    "use strict";

    angular.module("app.nurseries", ["app.controls", "ngRoute", "ui.bootstrap"])
        .config(function ($routeProvider) {
            $routeProvider.when("/", {
                controller: "nurseriesListController",
                controllerAs: "vm",
                templateUrl: "/app/Nurseries/nurseries-list.view.html"
            });

            $routeProvider.when("/edit/:id", {
                controller: "nurseryEditController",
                controllerAs: "vm",
                templateUrl: "/app/Nurseries/nursery-edit.view.html"
            });

            $routeProvider.when("/users", {
                controller: "usersListController",
                controllerAs: "vm",
                templateUrl: "/app/Nurseries/users-list.view.html"
            });

            $routeProvider.otherwise({
                redirectTo: "/"
            });
        });        
})(angular);