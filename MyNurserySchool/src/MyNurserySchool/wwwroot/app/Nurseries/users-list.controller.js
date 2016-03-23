﻿(function (angular) {

    "use strict";

    // Geeting the existing module
    angular.module("app.nurseries")
        .controller("UsersListController", UsersListController);

    function UsersListController($http, $scope, $window, $uibModal) {
        var vm = this;
        vm.users = [];
        vm.roles = [];
        vm.nurseries = [];
        vm.isBusy = true;

        $http.get("/Api/Users")
            .then(function (response) {
                angular.copy(response.data, vm.users);
                vm.getRoles();
            }, function (error) {
                toastr.error("Nepodarilo sa načítať dáta: " + error);
            })
            .finally(function () {
                vm.isBusy = false;
            });

        vm.getRoles = function () {
            $http.get("/Api/Roles")
                .then(function (response) {
                    angular.copy(response.data, vm.roles);
                    vm.getNurseries();
                }, function (error) {
                    toastr.error("Nepodarilo sa načítať dáta: " + error);
                })
                .finally(function () {
                    vm.isBusy = false;
                });
        }

        vm.getNurseries = function () {
            $http.get("/Api/Nurseries")
                .then(function (response) {
                    angular.copy(response.data, vm.nurseries);
                    vm.joinData();
                }, function (error) {
                    toastr.error("Nepodarilo sa načítať dáta: " + error);
                })
                .finally(function () {
                    vm.isBusy = false;
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

        }

        vm.editModal = function (user) {
            $scope.actualUser = user;
            $scope.roles = vm.roles;
            $scope.nurseries = [];
            _.each(vm.nurseries, function (nurs) {
                $scope.nurseries.push({ id: nurs.id, name: nurs.name })
            });

            var modalInstance = $uibModal.open({
                templateUrl: '/app/nurseries/user-edit-modal.template.html',
                controller: 'UserEditModalController',
                scope: $scope
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
                scope: $scope
            });

            modalInstance.result.then(function () {
                
            });
        }

        $scope.redirect = function (path) {
            $window.location.href = path;
        }
    }
})(angular);