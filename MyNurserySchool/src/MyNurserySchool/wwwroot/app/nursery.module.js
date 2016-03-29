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
        .run(function ($http, $location, $rootScope) {
            var nurseries = [];

            activate();

            function activate() {
                $http.get("/Api/Nurseries")
                    .then(function (response) {
                        angular.copy(response.data, nurseries);
                        if (!$rootScope.isAdmin && nurseries.length === 1) {
                            $rootScope.nurseryId = nurseries[0].id;
                            $rootScope.classes = nurseries[0].classes;
                        } else {
                            $location.path('/');
                        }
                    });
            }
        })
        .config(function ($routeProvider) {
            $routeProvider.when("/", {
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

            $routeProvider.when("/:nursId", {
                controller: "NurseryDetailController",
                controllerAs: "vm",
                templateUrl: "/app/Nursery/nursery-detail.view.html"
            });

            $routeProvider.when("/:nursId/edit", {
                controller: "NurseryEditController",
                controllerAs: "vm",
                templateUrl: "/app/Nursery/nursery-edit.view.html"
            });

            $routeProvider.when("/:nursId/class/:id/edit", {
                controller: "ClassEditController",
                controllerAs: "vm",
                templateUrl: "/app/Class/class-edit.view.html"
            });

            $routeProvider.when("/:nursId/class/:id", {
                controller: "ClassDetailController",
                controllerAs: "vm",
                templateUrl: "/app/Class/class-detail.view.html"
            });

            $routeProvider.when("/:nursId/employee/:id/edit", {
                controller: "EmployeeEditController",
                controllerAs: "vm",
                templateUrl: "/app/Employee/employee-edit.view.html"
            });

            $routeProvider.when("/:nursId/employee/:id", {
                controller: "EmployeeDetailController",
                controllerAs: "vm",
                templateUrl: "/app/Employee/employee-detail.view.html"
            });

            $routeProvider.when("/:nursId/child/:id/edit", {
                controller: "ChildEditController",
                controllerAs: "vm",
                templateUrl: "/app/Child/child-edit.view.html"
            });

            $routeProvider.when("/:nursId/child/:id", {
                controller: "ChildDetailController",
                controllerAs: "vm",
                templateUrl: "/app/Child/child-detail.view.html"
            });

            $routeProvider.when("/:nursId/employees", {
                controller: "EmployeesListController",
                controllerAs: "vm",
                templateUrl: "/app/Employee/employees-list.view.html"
            });

            $routeProvider.when("/:nursId/children", {
                controller: "ChildrenListController",
                controllerAs: "vm",
                templateUrl: "/app/Child/children-list-all.view.html"
            });

            $routeProvider.when("/:nursId/children/waiting", {
                controller: "ChildrenListController",
                controllerAs: "vm",
                templateUrl: "/app/Child/children-list-waiting.view.html"
            });

            $routeProvider.when("/:nursId/children/archive", {
                controller: "ChildrenListController",
                controllerAs: "vm",
                templateUrl: "/app/Child/children-list-archived.view.html"
            });

            $routeProvider.otherwise({
                redirectTo: "/"
            });
        });
})(angular);