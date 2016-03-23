(function (angular) {
    "use strict";

    angular.module("app.nursery")
        .controller("employeeDetailController", employeeDetailController);

    function employeeDetailController($scope, $http, $location, $routeParams, $sce, $controller) {
        $controller('baseController', {
            '$scope': $scope
        });

        var vm = this;
        vm.employeeId = $routeParams.id;
        vm.employee = {};
        vm.newNote = {};
        vm.attendanceStates = ["Žiadateľ", "Pracujúci", "Odstúpený"];

        vm.isBusy = true;
        $http.get("/Api/Employee/" + vm.employeeId)
            .then(function (response) {
                angular.copy(response.data, vm.employee);
                vm.employee.description = vm.employee.description ? $sce.trustAsHtml(vm.employee.description.replace(/(\r\n|\n|\r)/gm, '<br />')) : null;
                for (var i = 0; i < vm.employee.notes.length; i++)
                    if (vm.employee.notes[i].text != null)
                        vm.employee.notes[i].text = $sce.trustAsHtml(vm.employee.notes[i].text.replace(/(\r\n|\n|\r)/gm, '<br />'));
            }, function () {
                toastr.error("Nepodarilo sa načítať informácie o zamestnancovi");
            }).finally(function () {
                vm.isBusy = false;
            });

        vm.deleteEmployee = function () {
            vm.isBusy = true;
            $http.delete("/Api/Employee/" + vm.employee.id)
                .then(function () {
                    toastr.success("Zamestnanec bol vymazaný");
                    $location.path("#/");
                }, function (error) {
                    toastr.error("Zamestnanca sa nepodarilo vymazať");
                })
                .finally(function () {
                    vm.isBusy = false;
                });
        }

        vm.saveNote = function () {
            vm.isBusy = true;
            vm.newNote.employeeId = vm.employeeId;
            $http.post("/Api/Note/", vm.newNote)
                .then(function (response) {
                    vm.employee.notes.push(response.data);
                    vm.employee.notes[vm.employee.notes.length - 1].text = $sce.trustAsHtml(vm.employee.notes[vm.employee.notes.length - 1].text.replace(/(\r\n|\n|\r)/gm, '<br />'));
                    toastr.success("Poznámka bola zapísaná");
                    vm.newNote = {};
                }, function (error) {
                    toastr.error("Poznámku sa nepodarilo zapísať");
                })
                .finally(function () {
                    vm.isBusy = false;
                });
        }

        vm.deleteNote = function (id) {
            vm.isBusy = true;
            $http.delete("/Api/Note/" + id)
                .then(function () {
                    for (var i = 0; i < vm.employee.notes.length; i++) {
                        var note = vm.employee.notes[i];
                        if (note.id == id) {
                            vm.employee.notes.splice(i, 1);
                        }
                    }
                    toastr.success("Poznámka bola vymazaná");
                }, function (error) {
                    toastr.error("Poznámku sa nepodarilo vymazať");
                })
                .finally(function () {
                    vm.isBusy = false;
                });
        }
    }
})(angular);