(function () {

    "use strict";

    angular.module("nursery-app", ["simpleControls", "ngRoute"])
        .config(function ($routeProvider) {
            $routeProvider.when("/", {
                controller: "nurseryDetailController",
                controllerAs: "vm",
                templateUrl: "/views/Nursery/nurseryDetailView.html"
            });

            $routeProvider.when("/edit", {
                controller: "nurseryEditController",
                controllerAs: "vm",
                templateUrl: "/views/Nursery/nurseryEditView.html"
            });

            $routeProvider.when("/class/:id", {
                controller: "nurseryClassController",
                controllerAs: "vm",
                templateUrl: "/views/Nursery/nurseryClassView.html"
            });

            $routeProvider.when("/employees", {
                controller: "nurseryDetailController",
                controllerAs: "vm",
                templateUrl: "/views/Nursery/nurseryDetailView.html"
            });

            $routeProvider.when("/children", {
                controller: "nurseryDetailController",
                controllerAs: "vm",
                templateUrl: "/views/Nursery/nurseryDetailView.html"
            });

            $routeProvider.otherwise({
                redirectTo: "/"
            });
        })
})();