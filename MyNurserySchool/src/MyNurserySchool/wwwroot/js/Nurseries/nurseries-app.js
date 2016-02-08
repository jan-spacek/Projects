(function () {

    "use strict";

    angular.module("nurseries-app", ["simpleControls", "ngRoute"])
        .config(function ($routeProvider) {
            $routeProvider.when("/", {
                controller: "nurseriesController",
                controllerAs: "vm",
                templateUrl: "/views/Nurseries/nurseriesView.html"
            });

            $routeProvider.when("/new", {
                controller: "nurseryNewController",
                controllerAs: "vm",
                templateUrl: "/views/Nurseries/nurseryNewView.html"
            });

            $routeProvider.when("/edit/:id", {
                controller: "nurseryEditController",
                controllerAs: "vm",
                templateUrl: "/views/Nurseries/nurseryEditView.html"
            });

            $routeProvider.otherwise({
                redirectTo: "/"
            });
        });

})();