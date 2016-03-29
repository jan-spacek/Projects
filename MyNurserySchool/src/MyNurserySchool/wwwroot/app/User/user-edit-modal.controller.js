(function (angular) {
    "use strict";

    angular
        .module("app.nursery")
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