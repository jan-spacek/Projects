(function () {
    "use strict";

    angular.module("nursery-app")
        .controller("classEditController", classEditController);

    function classEditController($scope, $http, $location, $routeParams) {
        var vm = this;
        vm.classId = $routeParams.id;
        vm.nursery = {};
        vm.class = {};
        vm.isBusy = true;

        $http.get("/Api/Nursery/" + $scope.outerId)
            .then(function (response) {
                angular.copy(response.data, vm.nursery);
                for (var i = 0, l = vm.nursery.classes.length; i < l; i++){
                    if (vm.nursery.classes[i].id == vm.classId) {
                        angular.copy(vm.nursery.classes[i], vm.class);
                    }
                }                
            }, function () {
                toastr.error("Nepodarilo sa načítať informácie o triede");
            }).finally(function () {
                vm.isBusy = false;
            });

        vm.saveClass = function () {
            vm.isBusy = true;
            $http.put("/Api/Class/" + vm.nursery.id, vm.class)
                .then(function (response) {
                    toastr.success("Zmeny v triede " + vm.class.name + " boli úspešne uložené");
                    $location.path("#/");
                }, function () {
                    toastr.error("Triedu sa nepodarilo uložiť");
                }).finally(function () {
                    vm.isBusy = false;
                });
        }

        vm.deleteClass = function () {
            vm.isBusy = true;
            $http.delete("/Api/Class/" + vm.class.id)
                .then(function () {
                    toastr.success("Trieda id:" + vm.classId + " bola vymazaná");
                    $location.path("#/");
                }, function (error) {
                    toastr.error("Triedu sa nepodarilo vymazať");
                })
                .finally(function () {
                    vm.isBusy = false;
                });
        }
    }
})();