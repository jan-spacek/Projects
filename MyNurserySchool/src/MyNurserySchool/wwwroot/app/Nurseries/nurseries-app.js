(function () {

    "use strict";

    angular.module("nurseries-app", ["simpleControls", "ngRoute"])
        .config(function ($routeProvider) {
            $routeProvider.when("/", {
                controller: "nurseriesListController",
                controllerAs: "vm",
                templateUrl: "/app/Nurseries/nurseriesListView.html"
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