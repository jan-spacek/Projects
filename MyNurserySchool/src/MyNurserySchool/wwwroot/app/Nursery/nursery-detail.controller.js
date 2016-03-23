(function (angular) {

    "use strict";

    angular.module("app.nursery")
        .controller("NurseryDetailController", NurseryDetailController);

    function NurseryDetailController($scope, $routeParams, $http, $location, $window, $controller) {
        $controller('BaseController', {
            '$scope': $scope
        });

        var vm = this;
        vm.nursery = {};
        vm.isBusy = true;
        $scope.sortType = 'title';
        $scope.sortReverse = true;

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
                    for (var j = 0; j < response.data.children.length; j++)
                        if (response.data.children[j].attendance == 1)
                            vm.nursery.classes[i].children.push(response.data.children[j]);
                }, function () {
                    toastr.error("Nepodarilo sa načítať informácie o triede");
                });
        }
    }
})(angular);