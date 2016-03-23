(function (angular) {

    "use strict";

    angular.module("app.nursery")
        .controller("classDetailController", classDetailController);

    function classDetailController($scope, $http, $routeParams, $sce, $window, $controller) {
        $controller('baseController', {
            '$scope': $scope
        });

        var vm = this;
        vm.classId = $routeParams.id;
        vm.class = {};
        vm.children = [];
        vm.isBusy = true;

        $http.get("/Api/Class/" + vm.classId)
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
                toastr.error("Nepodarilo sa načítať dáta: " + error);
            })
            .finally(function () {
                vm.isBusy = false;
            });
    }
})(angular);