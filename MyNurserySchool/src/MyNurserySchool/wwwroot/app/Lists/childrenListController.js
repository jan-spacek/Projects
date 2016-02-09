(function () {
    "use strict";

    angular.module("nursery-app")
        .controller("childrenListController", childrenListController);

    function childrenListController($scope, $http) {
        var vm = this;
        vm.children = [];
        vm.isBusy = true;

        $http.get("/Api/Nursery/" + $scope.outerId + "/children")
            .then(function (response) {
                angular.copy(response.data, vm.children);
            }, function (error) {
                toastr.error("Nepodarilo sa načítať zoznam detí");
            })
            .finally(function () {
                vm.isBusy = false;
            });
    }
})();