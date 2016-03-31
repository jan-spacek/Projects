(function (angular) {

    "use strict";

    angular
        .module("app.nursery", [
            "common",
            "ngRoute",
            "ngAnimate",
            "mgcrea.ngStrap",
            "ui.bootstrap"
        ])
        .config(function ($routeProvider) {
            $routeProvider.when("/nurseries", {
                controller: "NurseriesListController",
                controllerAs: "vm",
                templateUrl: "/app/Nurseries/nurseries-list.view.html"
            });

            $routeProvider.when("/edit/:id", {
                controller: "NurseryAdminEditController",
                controllerAs: "vm",
                templateUrl: "/app/Nurseries/nursery-edit.view.html"
            });

            $routeProvider.when("/users", {
                controller: "UsersListController",
                controllerAs: "vm",
                templateUrl: "/app/User/users-list.view.html"
            });

            $routeProvider.when("/", {
                controller: "NurseryDetailController",
                controllerAs: "vm",
                templateUrl: "/app/Nursery/nursery-detail.view.html"
            });

            $routeProvider.when("/edit", {
                controller: "NurseryEditController",
                controllerAs: "vm",
                templateUrl: "/app/Nursery/nursery-edit.view.html"
            });

            $routeProvider.when("/class/:id/edit", {
                controller: "ClassEditController",
                controllerAs: "vm",
                templateUrl: "/app/Class/class-edit.view.html"
            });

            $routeProvider.when("/class/:id", {
                controller: "ClassDetailController",
                controllerAs: "vm",
                templateUrl: "/app/Class/class-detail.view.html"
            });

            $routeProvider.when("/employee/:id/edit", {
                controller: "EmployeeEditController",
                controllerAs: "vm",
                templateUrl: "/app/Employee/employee-edit.view.html"
            });

            $routeProvider.when("/employee/:id", {
                controller: "EmployeeDetailController",
                controllerAs: "vm",
                templateUrl: "/app/Employee/employee-detail.view.html"
            });

            $routeProvider.when("/child/:id/edit", {
                controller: "ChildEditController",
                controllerAs: "vm",
                templateUrl: "/app/Child/child-edit.view.html"
            });

            $routeProvider.when("/child/:id", {
                controller: "ChildDetailController",
                controllerAs: "vm",
                templateUrl: "/app/Child/child-detail.view.html"
            });

            $routeProvider.when("/employees", {
                controller: "EmployeesListController",
                controllerAs: "vm",
                templateUrl: "/app/Employee/employees-list.view.html"
            });

            $routeProvider.when("/children", {
                controller: "ChildrenListController",
                controllerAs: "vm",
                templateUrl: "/app/Child/children-list-all.view.html"
            });

            $routeProvider.when("/children/waiting", {
                controller: "ChildrenListController",
                controllerAs: "vm",
                templateUrl: "/app/Child/children-list-waiting.view.html"
            });

            $routeProvider.when("/children/archive", {
                controller: "ChildrenListController",
                controllerAs: "vm",
                templateUrl: "/app/Child/children-list-archived.view.html"
            });

            $routeProvider.otherwise({
                redirectTo: "/"
            });
        });
})(angular);