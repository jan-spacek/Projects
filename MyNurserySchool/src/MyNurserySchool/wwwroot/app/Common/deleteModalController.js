(function () {
    "use strict";

    angular.module("nursery-app")
        .controller("deleteModalController", deleteModalController);

    function deleteModalController($scope, $uibModalInstance) {

        $scope.ok = function () {
            $uibModalInstance.close();
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
}());