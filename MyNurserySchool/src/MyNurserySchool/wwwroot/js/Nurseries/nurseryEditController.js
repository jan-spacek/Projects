(function () {
    "use strict";

    angular.module("nurseries-app")
        .controller("nurseryEditController", nurseryEditController);

    function nurseryEditController($routeParams, $http, $location) {
        var scope = this;
        scope.id = $routeParams.id;
        scope.isBusy = true;
        scope.nursery = {};

        $http.get("/Api/Nursery/" + scope.id)
            .then(function (response) {
                angular.copy(response.data, scope.nursery);
            }, function () {
                toastr.error("Nepodarilo sa načítať informácie o škôlke");
            }).finally(function () {
                scope.isBusy = false;
            });

        scope.saveNursery = function () {
            scope.isBusy = true;
            $http.put("/Api/Nursery/", scope.nursery)
                .then(function (response) {
                    toastr.success("Zmeny v škôlke " + scope.nursery.name + " boli úspešne uložené");
                    $location.path("#/");
                }, function () {
                    toastr.error("Škôlku sa nepodarilo uložiť");
                }).finally(function () {
                    scope.isBusy = false;
                });
        }

        scope.deleteNursery = function () {
            scope.isBusy = true;
            $http.delete("/Api/Nursery/" + scope.nursery.id)
                .then(function () {
                    toastr.success("Škôlka id:" + scope.id + " bola vymazaná");
                    $location.path("#/");
                }, function (error) {
                    toastr.error("Škôlku sa nepodarilo vymazať");
                })
                .finally(function () {
                    scope.isBusy = false;
                });
        }
    }
})();