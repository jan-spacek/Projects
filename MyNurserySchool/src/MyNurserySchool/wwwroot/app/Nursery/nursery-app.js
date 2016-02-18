(function () {

    "use strict";

    angular.module("nursery-app", ["simpleControls", "ngRoute", "mgcrea.ngStrap"])
        .config(function ($routeProvider) {
            $routeProvider.when("/", {
                controller: "nurseryDetailController",
                controllerAs: "vm",
                templateUrl: "/app/Nursery/nurseryDetailView.html"
            });

            $routeProvider.when("/edit", {
                controller: "nurseryEditController",
                controllerAs: "vm",
                templateUrl: "/app/Nursery/nurseryEditView.html"
            });

            $routeProvider.when("/class/:id/edit", {
                controller: "classEditController",
                controllerAs: "vm",
                templateUrl: "/app/Class/classEditView.html"
            });

            $routeProvider.when("/class/:id", {
                controller: "classDetailController",
                controllerAs: "vm",
                templateUrl: "/app/Class/classDetailView.html"
            });

            $routeProvider.when("/employee/:id/edit", {
                controller: "employeeEditController",
                controllerAs: "vm",
                templateUrl: "/app/Employee/employeeEditView.html"
            });

            $routeProvider.when("/employee/:id", {
                controller: "employeeDetailController",
                controllerAs: "vm",
                templateUrl: "/app/Employee/employeeDetailView.html"
            });

            $routeProvider.when("/child/:id/edit", {
                controller: "childEditController",
                controllerAs: "vm",
                templateUrl: "/app/Child/childEditView.html"
            });

            $routeProvider.when("/child/:id", {
                controller: "childDetailController",
                controllerAs: "vm",
                templateUrl: "/app/Child/childDetailView.html"
            });

            $routeProvider.when("/employees", {
                controller: "employeesListController",
                controllerAs: "vm",
                templateUrl: "/app/Lists/employeesListView.html"
            });

            $routeProvider.when("/children", {
                controller: "childrenListController",
                controllerAs: "vm",
                templateUrl: "/app/Lists/childrenListView.html"
            });

            $routeProvider.when("/children/waiting", {
                controller: "childrenListController",
                controllerAs: "vm",
                templateUrl: "/app/Lists/childrenWaitingListView.html"
            });

            $routeProvider.when("/children/archive", {
                controller: "childrenListController",
                controllerAs: "vm",
                templateUrl: "/app/Lists/childrenArchiveView.html"
            });

            $routeProvider.otherwise({
                redirectTo: "/"
            });
        });
})();