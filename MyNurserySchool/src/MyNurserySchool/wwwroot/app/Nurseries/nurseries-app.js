(function () {

    "use strict";

    angular.module("nurseries-app", ["simpleControls", "ngRoute"])
        .config(function ($routeProvider) {
            $routeProvider.when("/", {
                controller: "nurseriesController",
                controllerAs: "vm",
                templateUrl: "/app/Nurseries/nurseriesView.html"
            });

            $routeProvider.when("/new", {
                controller: "nurseryNewController",
                controllerAs: "vm",
                templateUrl: "/app/Nurseries/nurseryNewView.html"
            });

            $routeProvider.when("/edit/:id", {
                controller: "nurseryEditController",
                controllerAs: "vm",
                templateUrl: "/app/Nurseries/nurseryEditView.html"
            });

            $routeProvider.otherwise({
                redirectTo: "/"
            });
        });

})();