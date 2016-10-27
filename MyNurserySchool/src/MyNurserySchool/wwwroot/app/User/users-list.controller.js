(function (angular) {

    "use strict";

    angular
        .module("app.nursery")
        .controller("UsersListController", UsersListController);

    function UsersListController($http, $scope, $window, $uibModal, DataService) {
        var vm = this;

        vm.users = [];
        vm.roles = [];
        vm.nurseries = [];
        vm.isBusy = true;


        DataService.getUsers()
            .then(function (response) {
                angular.copy(response.data, vm.users);
                vm.getRoles();
            }, function (error) {
                toastr.error("Nepodarilo sa načítať dáta: " + error);
            });

        
        vm.getRoles = function () {
            DataService.getRoles()
                .then(function (response) {
                    angular.copy(response.data, vm.roles);
                    vm.getNurseries();
                }, function (error) {
                    toastr.error("Nepodarilo sa načítať dáta: " + error);
                });
        }

        vm.getNurseries = function () {
            DataService.getAllNurseries()
                .then(function (response) {
                    angular.copy(response.data, vm.nurseries);
                    vm.joinData();
                }, function (error) {
                    toastr.error("Nepodarilo sa načítať dáta: " + error);
                });
        }

        vm.joinData = function () {

            _.each(vm.users, function (user) {
                user.nurseries = [];
                _.each(user.claims, function (claim) {
                    if (claim.claimType === "Nursery") {
                        var nursery = _.find(vm.nurseries, function (nurs) {
                            return nurs.id === parseInt(claim.claimValue);
                        });
                        user.nurseries.push({ id: parseInt(claim.claimValue), name: nursery.name });
                    }
                });
                user.userRoles = [];
                _.each(user.roles, function (role) {
                    var userRole = _.find(vm.roles, function (ur) {
                        return ur.id == role.roleId;
                    });
                    user.userRoles.push({ id: userRole.id, name: userRole.name });
                });
            });

            vm.isBusy = false;
        }

        vm.editModal = function (user) {
           $scope.actualUser = user;
           $scope.roles = vm.roles;
           $scope.nurseries = [];
            _.each(vm.nurseries, function (nurs) {
               $scope.nurseries.push({ id: nurs.id, name: nurs.name })
            });

            var modalInstance = $uibModal.open({
                templateUrl: '/App/User/user-edit-modal.template.html',
                controller: 'UserEditModalController',
                scope:$scope
            });

            modalInstance.result.then(function () {

                
            });
        }

        vm.generateModal = function (user) {

        }

        vm.deleteModal = function (user) {
           $scope.deleteModalTarget = "používateľa " + user.userName;

            var modalInstance = $uibModal.open({
                templateUrl: '/app/common/templates/delete-modal.template.html',
                controller: 'DeleteModalController',
                scope:$scope
            });

            modalInstance.result.then(function () {
                
            });
        }

       $scope.redirect = function (path) {
            $window.location.href = path;
        }
    }
})(angular);