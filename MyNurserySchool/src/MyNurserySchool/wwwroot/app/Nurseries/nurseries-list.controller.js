(function (angular) {

    "use strict";

    angular.module("app.nursery")
        .controller("NurseriesListController", NurseriesListController);

    function NurseriesListController($http, $scope, $window, $location, $rootScope, DataService) {
        var vm = this;
        vm.nurseries = [];
        vm.isBusy = true;

        activate();

        function activate() {
            DataService.getAllNurseries()
                .then(function (response) {
                    angular.copy(response.data, vm.nurseries);
                    $rootScope.nursery = null;
                }, function (error) {
                    toastr.error("Nepodarilo sa načítať dáta: " + error);
                })
                .finally(function () {
                    vm.isBusy = false;
                });
        }
        
        vm.nurseryDblClick = function (nursery) {
            $window.location = "/App/" + nursery.id ;
        }
    }
})(angular);