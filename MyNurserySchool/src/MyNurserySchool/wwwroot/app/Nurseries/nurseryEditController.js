(function () {
    "use strict";

    angular.module("nurseries-app")
        .controller("nurseryEditController", nurseryEditController);

    function nurseryEditController($routeParams, $http, $location) {
        var vm = this;
        vm.id = $routeParams.id;
        vm.nursery = {};
        vm.isNew = vm.id == 0;

        if (!vm.isNew) {
            vm.isBusy = true;
            $http.get("/Api/Nursery/" + vm.id)
                .then(function (response) {
                    angular.copy(response.data, vm.nursery);
                }, function () {
                    toastr.error("Nepodarilo sa načítať informácie o škôlke");
                }).finally(function () {
                    vm.isBusy = false;
                });
        }

        vm.saveNursery = function () {
            vm.isBusy = true;

            if (vm.isNew) {
                $http.post("/Api/Nursery", vm.nursery)
                    .then(function (response) {
                        toastr.success("Bola vytvorená nová škôlka " + vm.nursery.name);
                        $location.path("#/");
                    }, function () {
                        toastr.error("Škôlku sa nepodarilo uložiť");
                    }).finally(function () {
                        vm.isBusy = false;
                    });
            }
            else
            {
                $http.put("/Api/Nursery/", vm.nursery)
                    .then(function (response) {
                        toastr.success("Zmeny v škôlke " + vm.nursery.name + " boli úspešne uložené");
                        $location.path("#/");
                    }, function () {
                        toastr.error("Škôlku sa nepodarilo uložiť");
                    }).finally(function () {
                        vm.isBusy = false;
                    });
            }
        }

        vm.deleteNursery = function () {
            vm.isBusy = true;
            $http.delete("/Api/Nursery/" + vm.nursery.id)
                .then(function () {
                    toastr.success("Škôlka id:" + vm.id + " bola vymazaná");
                    $location.path("#/");
                }, function (error) {
                    toastr.error("Škôlku sa nepodarilo vymazať");
                })
                .finally(function () {
                    vm.isBusy = false;
                });
        }
    }
})();