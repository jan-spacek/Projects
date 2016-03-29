(function (angular) {

    "use strict";

    angular.module("app.nursery")
        .controller("NurseriesListController", NurseriesListController);

    function NurseriesListController($http, $scope, $window, $location, $rootScope) {
        var vm = this;
        vm.nurseries = [];
        vm.isBusy = true;

        activate();

        function activate() {
            $http.get("/Api/Nurseries")
                .then(function (response) {
                    angular.copy(response.data, vm.nurseries);
                    if (vm.nurseries.length === 1 && !$rootScope.isAdmin) {
                        vm.nurseryDblClick(vm.nurseries[0]);
                    } else {
                        $rootScope.nurseryId = undefined;
                    }
                }, function (error) {
                    toastr.error("Nepodarilo sa načítať dáta: " + error);
                })
                .finally(function () {
                    vm.isBusy = false;
                });
        }
        
        vm.nurseryDblClick = function (nursery) {
            $rootScope.nurseryId = nursery.id;
            $rootScope.classes = nursery.classes;
            $location.path(nursery.id);
        }
    }
})(angular);