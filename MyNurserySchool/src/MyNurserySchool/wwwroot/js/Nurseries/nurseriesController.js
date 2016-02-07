(function () {

    "use strict";

    // Geeting the existing module
    angular.module("nurseries-app")
        .controller("nurseriesController", nurseriesController);

    function nurseriesController($http) {
        var scope = this;
        scope.nurseries = [];
        scope.isBusy = true;

        $http.get("/Api/Nurseries")
            .then(function (response) {
                angular.copy(response.data, scope.nurseries);
            }, function (error) {
                toastr.error("Nepodarilo sa načítať dáta: " + error);
            })
            .finally(function () {
                scope.isBusy = false;
            });
    }
})();