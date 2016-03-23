(function (angular) {

    "use strict";

    angular.module("app.nursery", ["app.controls", "ngRoute", "mgcrea.ngStrap", "ui.bootstrap"])
        .config(function ($routeProvider) {
            $routeProvider.when("/", {
                controller: "nurseryDetailController",
                controllerAs: "vm",
                templateUrl: "/app/Nursery/nursery-detail.view.html"
            });

            $routeProvider.when("/edit", {
                controller: "nurseryEditController",
                controllerAs: "vm",
                templateUrl: "/app/Nursery/nursery-edit.view.html"
            });

            $routeProvider.when("/class/:id/edit", {
                controller: "classEditController",
                controllerAs: "vm",
                templateUrl: "/app/Class/class-edit.view.html"
            });

            $routeProvider.when("/class/:id", {
                controller: "classDetailController",
                controllerAs: "vm",
                templateUrl: "/app/Class/class-detail.view.html"
            });

            $routeProvider.when("/employee/:id/edit", {
                controller: "employeeEditController",
                controllerAs: "vm",
                templateUrl: "/app/Employee/employee-edit.view.html"
            });

            $routeProvider.when("/employee/:id", {
                controller: "employeeDetailController",
                controllerAs: "vm",
                templateUrl: "/app/Employee/employee-detail.view.html"
            });

            $routeProvider.when("/child/:id/edit", {
                controller: "childEditController",
                controllerAs: "vm",
                templateUrl: "/app/Child/child-edit.view.html"
            });

            $routeProvider.when("/child/:id", {
                controller: "childDetailController",
                controllerAs: "vm",
                templateUrl: "/app/Child/child-detail.view.html"
            });

            $routeProvider.when("/employees", {
                controller: "employeesListController",
                controllerAs: "vm",
                templateUrl: "/app/Lists/employees-list.view.html"
            });

            $routeProvider.when("/children", {
                controller: "childrenListController",
                controllerAs: "vm",
                templateUrl: "/app/Lists/children-list-all.view.html"
            });

            $routeProvider.when("/children/waiting", {
                controller: "childrenListController",
                controllerAs: "vm",
                templateUrl: "/app/Lists/children-list-waiting.view.html"
            });

            $routeProvider.when("/children/archive", {
                controller: "childrenListController",
                controllerAs: "vm",
                templateUrl: "/app/Lists/children-list-archived.view.html"
            });

            $routeProvider.otherwise({
                redirectTo: "/"
            });
        });
})(angular);