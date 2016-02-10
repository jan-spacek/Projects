(function () {
    "use strict";

    angular.module("nursery-app")
        .controller("childrenListController", childrenListController);

    function childrenListController($scope, $http, $sce) {
        var vm = this;
        vm.children = [];
        vm.isBusy = true;

        $http.get("/Api/Nursery/" + $scope.outerId + "/children")
            .then(function (response) {
                angular.copy(response.data, vm.children);
                for (var i = 0; i < vm.children.length; i++)
                    if (vm.children[i].contacts)
                        vm.children[i].contacts = $sce.trustAsHtml(vm.children[i].contacts.replace(/(\r\n|\n|\r)/gm, '<br />'));
            }, function (error) {
                toastr.error("Nepodarilo sa načítať zoznam detí");
            })
            .finally(function () {
                vm.isBusy = false;
            });
    }
})();