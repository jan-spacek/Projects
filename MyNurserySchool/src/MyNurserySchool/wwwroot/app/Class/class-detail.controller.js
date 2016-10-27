(function (angular) {

    "use strict";

    angular.module("app.nursery")
        .controller("ClassDetailController", ClassDetailController);

    function ClassDetailController($scope, $rootScope, $http, $routeParams, $sce, $window, $controller, DataService) {
        $controller('BaseController', {
            '$scope': $scope
        });

        var vm = this;

        vm.classId = $routeParams.id;
        vm.nurseryId = $rootScope.nursery.id;
        vm.class = {};
        vm.children = [];
        vm.isBusy = true;

        DataService.getClass(vm.classId)
            .then(function (response) {
                angular.copy(response.data, vm.class);
                for (var i = 0; i < vm.class.children.length; i++) {
                    vm.class.children[i].fullName = vm.class.children[i].firstName + " " + vm.class.children[i].lastName;
                    if (vm.class.children[i].contacts)
                        vm.class.children[i].contacts = $sce.trustAsHtml(vm.class.children[i].contacts.replace(/(\r\n|\n|\r)/gm, '<br />'));
                    if (vm.class.children[i].description)
                        vm.class.children[i].description = $sce.trustAsHtml(vm.class.children[i].description.replace(/(\r\n|\n|\r)/gm, '<br />'));
                    if (vm.class.children[i].attendance == 1)
                        vm.children.push(vm.class.children[i]);
                }

            }, function (error) {
                toastr.error("Nepodarilo sa načítať informácie o triede");
            })
            .finally(function () {
                vm.isBusy = false;
            });
    }
})(angular);