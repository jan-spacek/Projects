(function () {

    "use strict";

    angular.module("nursery-app")
        .controller("nurseryDetailController", nurseryDetailController);

    function nurseryDetailController($scope, $routeParams, $http, $location, $window, $controller) {
        $controller('baseController', {
            '$scope': $scope
        });

        var vm = this;
        vm.nursery = {};
        vm.isBusy = true;

        $http.get("/Api/Nursery/" + $scope.outerId)
            .then(function (response) {
                angular.copy(response.data, vm.nursery);
                if (vm.nursery.classes.length > 0) {
                    vm.isBusy = true;
                    for (var i = 0; i < vm.nursery.classes.length; i++) {
                        getClass(i);
                    }
                }
            }, function () {
                toastr.error("Nepodarilo sa načítať informácie o škôlke");
            }).finally(function () {
                vm.isBusy = false;
            });

        function getClass(i) {
            $http.get("/Api/Class/" + vm.nursery.classes[i].id)
                .then(function (response) {
                    angular.copy(response.data.children, vm.nursery.classes[i].children);
                }, function () {
                    toastr.error("Nepodarilo sa načítať informácie o triede");
                });
        }
    }
})();