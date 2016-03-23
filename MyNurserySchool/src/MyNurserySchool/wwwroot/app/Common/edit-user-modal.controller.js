(function (angular) {
    "use strict";

    angular.module("app.nurseries")
        .controller("editUserModalController", editUserModalController);

    function editUserModalController($scope, $uibModalInstance) {

        $scope.ok = function () {
            $uibModalInstance.close();
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
})(angular);