(function () {
    "use strict";

    // Geeting the existing module
    angular.module("nurseries-app")
        .controller("nurseryNewController", nurseryNewController);

    function nurseryNewController($http, $location) {
        var vm = this;
        vm.newNursery = {};

        vm.addNursery = function () {
            vm.isBusy = true;

            $http.post("/Api/Nursery", vm.newNursery)
                .then(function (response) {
                    toastr.success("Bola vytvorená nová škôlka " + vm.newNursery.name);
                    vm.newNursery = {};
                    $location.path("#/");
                }, function () {
                    toastr.error("Škôlku sa nepodarilo uložiť");
                }).finally(function () {
                    vm.isBusy = false;
                });
        }
    }
})();