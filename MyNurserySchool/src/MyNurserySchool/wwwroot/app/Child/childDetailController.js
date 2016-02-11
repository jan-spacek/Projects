(function () {
    "use strict";

    angular.module("nursery-app")
        .controller("childDetailController", childDetailController);

    function childDetailController($scope, $http, $location, $routeParams, $sce, $controller) {
        $controller('baseController', {
            '$scope': $scope
        });

        var vm = this;
        vm.childId = $routeParams.id;
        vm.child = {};
        vm.newNote = {};
        vm.attendanceStates = ["Žiadateľ", "Docházdajúci", "Odstúpený"];


        vm.isBusy = true;
        $http.get("/Api/Child/" + vm.childId)
            .then(function (response) {
                angular.copy(response.data, vm.child);
                vm.classId = vm.child.classId;
                vm.child.description = vm.child.description ? $sce.trustAsHtml(vm.child.description.replace(/(\r\n|\n|\r)/gm, '<br />')) : null;
                vm.child.contacts = vm.child.contacts ? $sce.trustAsHtml(vm.child.contacts.replace(/(\r\n|\n|\r)/gm, '<br />')) : null;
                getClassName();

                for (var i = 0; i < vm.child.notes.length; i++)
                    if (vm.child.notes[i].text != null)
                        vm.child.notes[i].text = $sce.trustAsHtml(vm.child.notes[i].text.replace(/(\r\n|\n|\r)/gm, '<br />'));
            }, function () {
                toastr.error("Nepodarilo sa načítať informácie o dieťati");
            }).finally(function () {
                vm.isBusy = false;
            });

        function getClassName() {
            $http.get("/Api/Class/" + vm.child.classId)
                .then(function (response) {
                    vm.classTitle = response.data.name;
                }, function () {
                    toastr.error("Nepodarilo sa načítať informácie o škôlke");
                }).finally(function () {
                    vm.isBusy = false;
                });
        }

        vm.deleteChild = function () {
            vm.isBusy = true;
            $http.delete("/Api/Child/" + vm.child.id)
                .then(function () {
                    toastr.success("Dieťa bolo vymazané");
                    $location.path("#/class/" + vm.classId);
                }, function (error) {
                    toastr.error("Dieťa sa nepodarilo vymazať");
                })
                .finally(function () {
                    vm.isBusy = false;
                });
        }

        vm.saveNote = function () {
            vm.isBusy = true;
            vm.newNote.childId = vm.childId;
            $http.post("/Api/Note/", vm.newNote)
                .then(function (response) {
                    vm.child.notes.push(response.data);
                    vm.child.notes[vm.child.notes.length - 1].text = $sce.trustAsHtml(vm.child.notes[vm.child.notes.length - 1].text.replace(/(\r\n|\n|\r)/gm, '<br />'));
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
                    for (var i = 0; i < vm.child.notes.length; i++) {
                        var note = vm.child.notes[i];
                        if (note.id == id) {
                            vm.child.notes.splice(i, 1);
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
})();