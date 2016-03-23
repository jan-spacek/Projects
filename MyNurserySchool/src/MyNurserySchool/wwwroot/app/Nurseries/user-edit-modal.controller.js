(function (angular) {
    "use strict";

    angular
        .module("app.nurseries")
        .controller("UserEditModalController", UserEditModalController);

    function UserEditModalController($scope, $uibModalInstance) {

        $scope.ok = function () {
            $uibModalInstance.close();
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
})(angular);