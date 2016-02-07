(function () {
    "use strict";

    // Geeting the existing module
    angular.module("nurseries-app")
        .controller("nurseryNewController", nurseryNewController);

    function nurseryNewController($http, $location) {
        var scope = this;
        scope.newNursery = {};

        scope.addNursery = function () {
            scope.isBusy = true;

            $http.post("/Api/Nursery", scope.newNursery)
                .then(function (response) {
                    toastr.success("Bola vytvorená nová škôlka " + scope.newNursery.name);
                    scope.newNursery = {};
                    $location.path("#/");
                }, function () {
                    toastr.error("Škôlku sa nepodarilo uložiť");
                }).finally(function () {
                    scope.isBusy = false;
                });
        }
    }
})();