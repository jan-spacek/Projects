(function (angular) {
    "use strict";

    angular.module("app.nursery")
        .controller("ChildrenListController", ChildrenListController);

    function ChildrenListController($scope, $http, $sce, $controller, $rootScope, DataService) {
        $controller('BaseController', {
            '$scope':$scope
        });

        var vm = this;
        vm.nurseryId = $rootScope.nursery.id;
        vm.children = [];
        vm.attendantChildren = [];
        vm.waitingChildren = [];
        vm.archivedChildren = [];
        vm.classes = [];
        vm.isBusy = true;

        $scope.sortType = 'birthDate';

        activate();

        function activate() {
            DataService.getNursery(vm.nurseryId)
                .then(function (response) {
                    if (response.data.classes) {
                        for (var i = 0; i < response.data.classes.length; i++)
                            vm.classes[response.data.classes[i].id] = response.data.classes[i].name;
                    }
                }, function (error) {
                    toastr.error("Nepodarilo sa načítať zoznam škôlok:<br/>" + error.data.message);
                });


            DataService.getAllChildren(vm.nurseryId)
                .then(function (response) {
                    angular.copy(response.data, vm.children);
                    if (vm.children.length > 0) {
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
                    }
                }, function (error) {
                    toastr.error("Nepodarilo sa načítať zoznam detí:<br/>" + error.data.message);
                })
                .finally(function () {
                    vm.isBusy = false;
                });
        }
    }
})(angular);