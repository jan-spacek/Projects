(function () {

    "use strict";

    angular.module("nurseries-app", ["simpleControls", "ngRoute", "ui.bootstrap"])
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


    angular.module("nurseries-app")
        .controller("deleteModalController", deleteModalController);

    function deleteModalController($scope, $uibModalInstance) {

        $scope.ok = function () {
            $uibModalInstance.close();
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();