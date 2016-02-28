(function () {
    "use strict";

    angular.module("nursery-app")
        .controller("childrenListController", childrenListController);

    function childrenListController($scope, $http, $sce, $window, $controller) {
        $controller('baseController', {
            '$scope': $scope
        });

        var vm = this;
        vm.children = [];
        vm.attendantChildren = [];
        vm.waitingChildren = [];
        vm.archivedChildren = [];
        vm.classes = [];
        vm.isBusy = true;

        $scope.sortType = 'birthDate';

        $http.get("/Api/Nursery/" + $scope.outerId)
            .then(function (response) {
                for (var i = 0; i < response.data.classes.length; i++)
                    vm.classes[response.data.classes[i].id] = response.data.classes[i].name;
            }, function (error) {
                toastr.error("Nepodarilo sa načítať zoznam detí");
            })
            .finally(function () {
                vm.isBusy = false;
            });

        $http.get("/Api/Nursery/" + $scope.outerId + "/children")
            .then(function (response) {
                angular.copy(response.data, vm.children);
                for (var i = 0; i < vm.children.length; i++) {
                    vm.children[i].fullName = vm.children[i].firstName + " " + vm.children[i].lastName;
                    vm.children[i].className = vm.classes[vm.children[i].classId];

                    if (vm.children[i].contacts)
                        vm.children[i].contacts = $sce.trustAsHtml(vm.children[i].contacts.replace(/(\r\n|\n|\r)/gm, '<br />'));

                    if (vm.children[i].description)
                        vm.children[i].description = $sce.trustAsHtml(vm.children[i].description.replace(/(\r\n|\n|\r)/gm, '<br />'));

                    if (vm.children[i].attendance == 0)
                        vm.waitingChildren.push(vm.children[i]);
                    else if (vm.children[i].attendance == 1)
                        vm.attendantChildren.push(vm.children[i]);
                    else if (vm.children[i].attendance == 2)
                        vm.archivedChildren.push(vm.children[i]);
                }
            }, function (error) {
                toastr.error("Nepodarilo sa načítať zoznam detí");
            })
            .finally(function () {
                vm.isBusy = false;
            });
    }
})();