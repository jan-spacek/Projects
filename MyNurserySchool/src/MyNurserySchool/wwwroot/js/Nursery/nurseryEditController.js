(function () {

    "use strict";

    angular.module("nursery-app")
        .controller("nurseryEditController", ['$scope', '$http', nurseryEditController]);

    function nurseryEditController($scope, $http) {
        var vm = this;
        vm.nursery = [];
        vm.isBusy = true;

        $http.get("/Api/Nursery/" + $scope.outerId)
            .then(function (response) {
                angular.copy(response.data, vm.nursery);
            }, function () {
                toastr.error("Nepodarilo sa načítať informácie o škôlke");
            }).finally(function () {
                vm.isBusy = false;
            });
    }
})();