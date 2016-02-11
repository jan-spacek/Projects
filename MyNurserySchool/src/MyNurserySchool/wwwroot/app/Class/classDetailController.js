(function () {

    "use strict";

    angular.module("nursery-app")
        .controller("classDetailController", classDetailController);

    function classDetailController($scope, $http, $routeParams, $sce, $window, $controller) {
        $controller('baseController', {
            '$scope': $scope
        });

        var vm = this;
        vm.classId = $routeParams.id;
        vm.class = {};
        vm.isBusy = true;

        $http.get("/Api/Class/" + vm.classId)
            .then(function (response) {
                angular.copy(response.data, vm.class);
                for (var i = 0; i < vm.class.children.length; i++)
                    if (vm.class.children[i].contacts)
                        vm.class.children[i].contacts = $sce.trustAsHtml(vm.class.children[i].contacts.replace(/(\r\n|\n|\r)/gm, '<br />'));
            }, function (error) {
                toastr.error("Nepodarilo sa načítať dáta: " + error);
            })
            .finally(function () {
                vm.isBusy = false;
            });
    }
})();