(function () {
    "use strict";

    angular.module("nurseries-app")
        .controller("editUserModalController", editUserModalController);

    function editUserModalController($scope, $uibModalInstance) {

        $scope.ok = function () {
            $uibModalInstance.close();
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
}());