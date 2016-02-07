(function () {

    "use strict";

    angular.module("nurseries-app", ["simpleControls", "ngRoute"])
        .config(function ($routeProvider) {
            $routeProvider.when("/", {
                controller: "nurseriesController",
                controllerAs: "scope",
                templateUrl: "/views/Nurseries/nurseriesView.html"
            });

            $routeProvider.when("/new", {
                controller: "nurseryNewController",
                controllerAs: "scope",
                templateUrl: "/views/Nurseries/nurseryNewView.html"
            });

            $routeProvider.when("/edit/:id", {
                controller: "nurseryEditController",
                controllerAs: "scope",
                templateUrl: "/views/Nurseries/nurseryEditView.html"
            });

            $routeProvider.otherwise({
                redirectTo: "/"
            });
        });

})();