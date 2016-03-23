(function (angular) {
    "use strict";

    angular
        .module("app.controls")
        .controller("DeleteModalController", DeleteModalController);

    function DeleteModalController($scope, $uibModalInstance) {

        $scope.ok = function () {
            $uibModalInstance.close();
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }

})(angular);