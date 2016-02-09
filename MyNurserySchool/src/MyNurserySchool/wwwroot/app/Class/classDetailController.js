(function () {

    "use strict";

    angular.module("nursery-app")
        .controller("classDetailController", classDetailController);

    function classDetailController($scope, $http, $location, $routeParams) {
        var vm = this;
        vm.classId = $routeParams.id;
        vm.class = {};
        vm.isBusy = true;

        $http.get("/Api/Class/" + vm.classId)
            .then(function (response) {
                angular.copy(response.data, vm.class);
            }, function (error) {
                toastr.error("Nepodarilo sa načítať dáta: " + error);
            })
            .finally(function () {
                vm.isBusy = false;
            });
    }
})();