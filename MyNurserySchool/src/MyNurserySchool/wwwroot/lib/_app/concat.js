(function (angular) {
    "use strict";

    angular.module("common", []);

})(angular);
(function (angular) {

    "use strict";

    angular
        .module("app.nursery", [
            "common",
            "ngRoute",
            "ngAnimate",
            "mgcrea.ngStrap",
            "ui.bootstrap"
        ])
        .config(["$routeProvider", function ($routeProvider) {
            $routeProvider.when("/nurseries", {
                controller: "NurseriesListController",
                controllerAs: "vm",
                templateUrl: "/app/Nurseries/nurseries-list.view.html"
            });

            $routeProvider.when("/edit/:id", {
                controller: "NurseryAdminEditController",
                controllerAs: "vm",
                templateUrl: "/app/Nurseries/nursery-edit.view.html"
            });

            $routeProvider.when("/users", {
                controller: "UsersListController",
                controllerAs: "vm",
                templateUrl: "/app/User/users-list.view.html"
            });

            $routeProvider.when("/", {
                controller: "NurseryDetailController",
                controllerAs: "vm",
                templateUrl: "/app/Nursery/nursery-detail.view.html"
            });

            $routeProvider.when("/edit", {
                controller: "NurseryEditController",
                controllerAs: "vm",
                templateUrl: "/app/Nursery/nursery-edit.view.html"
            });

            $routeProvider.when("/class/:id/edit", {
                controller: "ClassEditController",
                controllerAs: "vm",
                templateUrl: "/app/Class/class-edit.view.html"
            });

            $routeProvider.when("/class/:id", {
                controller: "ClassDetailController",
                controllerAs: "vm",
                templateUrl: "/app/Class/class-detail.view.html"
            });

            $routeProvider.when("/employee/:id/edit", {
                controller: "EmployeeEditController",
                controllerAs: "vm",
                templateUrl: "/app/Employee/employee-edit.view.html"
            });

            $routeProvider.when("/employee/:id", {
                controller: "EmployeeDetailController",
                controllerAs: "vm",
                templateUrl: "/app/Employee/employee-detail.view.html"
            });

            $routeProvider.when("/child/:id/edit", {
                controller: "ChildEditController",
                controllerAs: "vm",
                templateUrl: "/app/Child/child-edit.view.html"
            });

            $routeProvider.when("/child/:id", {
                controller: "ChildDetailController",
                controllerAs: "vm",
                templateUrl: "/app/Child/child-detail.view.html"
            });

            $routeProvider.when("/employees", {
                controller: "EmployeesListController",
                controllerAs: "vm",
                templateUrl: "/app/Employee/employees-list.view.html"
            });

            $routeProvider.when("/children", {
                controller: "ChildrenListController",
                controllerAs: "vm",
                templateUrl: "/app/Child/children-list-all.view.html"
            });

            $routeProvider.when("/children/waiting", {
                controller: "ChildrenListController",
                controllerAs: "vm",
                templateUrl: "/app/Child/children-list-waiting.view.html"
            });

            $routeProvider.when("/children/archive", {
                controller: "ChildrenListController",
                controllerAs: "vm",
                templateUrl: "/app/Child/children-list-archived.view.html"
            });

            $routeProvider.otherwise({
                redirectTo: "/"
            });
        }]);
})(angular);
(function (angular) {
    "use strict";

    angular
        .module("app.nursery")
        .factory("dataService", ["$http", DataService]);

    function DataService($http) {

        // Nursery
        var getAllNurseries = function () {
            return $http.get("/Api/Nurseries");
        }
        var getNursery = function (id) {
            return $http.get("/Api/Nursery/" + id);
        }
        var insertNursery = function (nursery) {
            return $http.get("/Api/Nursery", nursery);
        }
        var updateNursery = function (nursery) {
            return $http.get("/Api/Nursery", nursery);
        }
        var deleteNursery = function (id) {
            return $http.delete("/Api/Nursery/" + id);
        }

        // Class
        var getAllClasses = function (nurseryId) {
            return $http.get("/Api/Nursery/" + nurseryId + "/Classes/");
        }
        var getClass = function (id) {
            return $http.get("/Api/Class/" + id);
        }
        var insertClass = function (nurseryId, cls) {
            return $http.post("/Api/Class/" + nurseryId, cls)
        }
        var updateClass = function (nurseryId, cls) {
            return $http.put("/Api/Class/" + nurseryId, cls)
        }
        var deleteClass = function (id) {
            return $http.delete("/Api/Class/" + id);
        }

        //Child
        var getAllChildren = function (nurseryId) {
            return $http.get("/Api/Nursery/" + nurseryId + "/children");
        }
        var getChild = function (id) {
            return $http.get("/Api/Child/" + id);
        }
        var insertChild = function (child) {
            return $http.post("/Api/Child/", child)
        }
        var updateChild = function (child) {
            return $http.put("/Api/Child/", child)
        }
        var deleteChild = function (id) {
            return $http.delete("/Api/Child/" + id);
        }

        //Employee
        var getAllEmployees = function (nurseryId) {
            return $http.get("/Api/Nursery/" + nurseryId + "/employees");
        }
        var getEmployee = function (id) {
            return $http.get("/Api/Employee/" + id);
        }
        var insertEmployee = function (nurseryId, employee) {
            return $http.post("/Api/Employee/" + nurseryId, employee)
        }
        var updateEmployee = function (nurseryId, employee) {
            return $http.put("/Api/Employee/" + nurseryId, employee)
        }
        var deleteEmployee = function (id) {
            return $http.delete("/Api/Employee/" + id);
        }

        //Note
        var insertNote = function (note) {
            return $http.post("/Api/Note/", note)
        }
        var deleteNote = function (id) {
            return $http.delete("/Api/Note/" + id);
        }

        //Roles
        var getRoles = function () {
            return $http.get("/Api/Roles");
        }

        return this;
    };
})(angular);
(function (angular) {
    "use strict";

    ChildDetailController.$inject = ["$scope", "$http", "$location", "$routeParams", "$sce", "$controller"];
    angular.module("app.nursery")
        .controller("ChildDetailController", ChildDetailController);

    function ChildDetailController($scope, $http, $location, $routeParams, $sce, $controller) {
        $controller('BaseController', {
            '$scope':$scope
        });

        var vm = this;
        vm.childId = $routeParams.id;
        vm.nurseryId = parseInt($routeParams.nursId);
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
})(angular);
(function (angular) {
    "use strict";

    ChildEditController.$inject = ["$scope", "$rootScope", "$http", "$routeParams", "$controller", "$uibModal"];
    angular.module("app.nursery")
        .controller("ChildEditController", ChildEditController);

    function ChildEditController($scope, $rootScope, $http, $routeParams, $controller, $uibModal) {
        $controller('BaseController', {
            '$scope':$scope
        });

        var vm = this;
        vm.childId = $routeParams.id;
        vm.nurseryId = $rootScope.nursery.id;
        vm.child = {};
        vm.classId = 0;
        vm.isNew = vm.childId == 0;
       $scope.attendance = [{ id: 0, name: 'Žiadateľ' }, { id: 1, name: 'Dochádzajúci' }, { id: 2, name: 'Odstúpený' }];
        vm.classes = [];

        $http.get("/Api/Nursery/" + vm.nurseryId + "/Classes/")
            .then(function (response) {
                angular.copy(response.data, vm.classes);
               $scope.classes = vm.classes;
            }, function () {
                toastr.error("Nepodarilo sa načítať informácie o triedach");
            }).finally(function () {
                vm.isBusy = false;
            });


        if (!vm.isNew) {
            vm.isBusy = true;
            $http.get("/Api/Child/" + vm.childId)
                .then(function (response) {
                    angular.copy(response.data, vm.child);
                    vm.classId = vm.child.classId;
                }, function () {
                    toastr.error("Nepodarilo sa načítať informácie o dieťati");
                }).finally(function () {
                    vm.isBusy = false;
                });
        }

        vm.saveChild = function (isValid) {
            if (isValid) {
                vm.isBusy = true;
                vm.child.nurseryId = vm.nurseryId;

                if (vm.isNew) {
                    $http.post("/Api/Child/", vm.child)
                        .then(function (response) {
                            toastr.success("Dieťa " + vm.child.firstName + " " + vm.child.lastName + " bolo úspešne vytvorené");
                           $scope.back();
                        }, function () {
                            toastr.error("Dieťa sa nepodarilo vytvoriť");
                        }).finally(function () {
                            vm.isBusy = false;
                        });
                }
                else {
                    if (vm.child.classId == null)
                        vm.child.classId = vm.classId;
                    $http.put("/Api/Child/", vm.child)
                        .then(function (response) {
                            toastr.success("Zmeny v dieťati " + vm.child.firstName + " " + vm.child.lastName + " boli úspešne uložené");
                           $scope.back();
                        }, function () {
                            toastr.error("Dieťa sa nepodarilo uložiť");
                        }).finally(function () {
                            vm.isBusy = false;
                        });
                }
            }
        }

        vm.deleteChildModal = function () {
           $scope.deleteModalTarget = "dieťa " + vm.child.firstName + " " + vm.child.lastName;

            var modalInstance = $uibModal.open({
                templateUrl: '/app/common/templates/delete-modal.template.html',
                controller: 'DeleteModalController',
                scope:$scope
            });

            modalInstance.result.then(function () {
                vm.deleteChild();
            });
        }

        vm.deleteChild = function () {
            vm.isBusy = true;
            $http.delete("/Api/Child/" + vm.child.id)
                .then(function () {
                    toastr.success("Dieťa bolo vymazané");
                   $scope.back();
                }, function (error) {
                    toastr.error("Dieťa sa nepodarilo vymazať");
                })
                .finally(function () {
                    vm.isBusy = false;
                });
        }        
    }
})(angular);
(function (angular) {
    "use strict";

    ChildrenListController.$inject = ["$scope", "$http", "$sce", "$controller", "$rootScope"];
    angular.module("app.nursery")
        .controller("ChildrenListController", ChildrenListController);

    function ChildrenListController($scope, $http, $sce, $controller, $rootScope) {
        $controller('BaseController', {
            '$scope':$scope
        });

        var vm = this;
        vm.nurseryId = $rootScope.nursery.id;
        vm.children = [];
        vm.attendantChildren = [];
        vm.waitingChildren = [];
        vm.archivedChildren = [];
        vm.classes = [];
        vm.isBusy = true;

        $scope.sortType = 'birthDate';

        activate();

        function activate() {
            getNursery();
            getChildren();
        }

        function getNursery() {
            $http.get("/Api/Nursery/" + vm.nurseryId)
                .then(function (response) {
                    if (response.data.classes) {
                        for (var i = 0; i < response.data.classes.length; i++)
                            vm.classes[response.data.classes[i].id] = response.data.classes[i].name;
                    }
                }, function (error) {
                    toastr.error("Nepodarilo sa načítať zoznam škôlok:<br/>" + error.data.message);
                });
        }

        function getChildren() {
            $http.get("/Api/Nursery/" + vm.nurseryId + "/children")
                .then(function (response) {
                    angular.copy(response.data, vm.children);
                    if (vm.children.length > 0) {
                        for (var i = 0; i < vm.children.length; i++) {
                            vm.children[i].fullName = vm.children[i].firstName + " " + vm.children[i].lastName;
                            vm.children[i].className = vm.classes[vm.children[i].classId];

                            if (vm.children[i].contacts)
                                vm.children[i].contacts = $sce.trustAsHtml(vm.children[i].contacts.replace(/(\r\n|\n|\r)/gm, '<br />'));

                            if (vm.children[i].description)
                                vm.children[i].description = $sce.trustAsHtml(vm.children[i].description.replace(/(\r\n|\n|\r)/gm, '<br />'));

                            if (vm.children[i].attendance == 0)
                                vm.waitingChildren.push(vm.children[i]);
                            else if (vm.children[i].attendance == 1)
                                vm.attendantChildren.push(vm.children[i]);
                            else if (vm.children[i].attendance == 2)
                                vm.archivedChildren.push(vm.children[i]);
                        }
                    }
                }, function (error) {
                    toastr.error("Nepodarilo sa načítať zoznam detí:<br/>" + error.data.message);
                })
                .finally(function () {
                    vm.isBusy = false;
                });
        }
    }
})(angular);
(function (angular) {

    "use strict";

    ClassDetailController.$inject = ["$scope", "$rootScope", "$http", "$routeParams", "$sce", "$window", "$controller"];
    angular.module("app.nursery")
        .controller("ClassDetailController", ClassDetailController);

    function ClassDetailController($scope, $rootScope, $http, $routeParams, $sce, $window, $controller) {
        $controller('BaseController', {
            '$scope':$scope
        });

        var vm = this;
        vm.classId = $routeParams.id;
        vm.nurseryId = $rootScope.nursery.id;
        vm.class = {};
        vm.children = [];
        vm.isBusy = true;

        $http.get("/Api/Class/" + vm.classId)
            .then(function (response) {
                angular.copy(response.data, vm.class);
                for (var i = 0; i < vm.class.children.length; i++) {
                    vm.class.children[i].fullName = vm.class.children[i].firstName + " " + vm.class.children[i].lastName;
                    if (vm.class.children[i].contacts)
                        vm.class.children[i].contacts = $sce.trustAsHtml(vm.class.children[i].contacts.replace(/(\r\n|\n|\r)/gm, '<br />'));
                    if (vm.class.children[i].description)
                        vm.class.children[i].description = $sce.trustAsHtml(vm.class.children[i].description.replace(/(\r\n|\n|\r)/gm, '<br />'));
                    if (vm.class.children[i].attendance == 1)
                        vm.children.push(vm.class.children[i]);
                }
                    
            }, function (error) {
                toastr.error("Nepodarilo sa načítať informácie o triede");
            })
            .finally(function () {
                vm.isBusy = false;
            });
    }
})(angular);
(function () {
    "use strict";

    ClassEditController.$inject = ["$scope", "$rootScope", "$http", "$location", "$routeParams", "$controller", "$uibModal"];
    angular.module("app.nursery")
        .controller("ClassEditController", ClassEditController);

    function ClassEditController($scope, $rootScope, $http, $location, $routeParams, $controller, $uibModal) {
        $controller('BaseController', {
            '$scope':$scope
        });

        var vm = this;
        vm.classId = $routeParams.id;
        vm.nurseryId = $rootScope.nursery.id;
        vm.nursery = {};
        vm.class = {};
        vm.isNew = vm.classId == 0;
        vm.isBusy = true;

        $http.get("/Api/Nursery/" + vm.nurseryId)
            .then(function (response) {
                angular.copy(response.data, vm.nursery);
                if (!vm.isNew) {
                    for (var i = 0, l = vm.nursery.classes.length; i < l; i++) {
                        if (vm.nursery.classes[i].id == vm.classId) {
                            angular.copy(vm.nursery.classes[i], vm.class);
                        }
                    }
                }

            }, function () {
                toastr.error("Nepodarilo sa načítať informácie o triede");
            }).finally(function () {
                vm.isBusy = false;
            });

        vm.saveClass = function (isValid) {
            if (isValid) {
                vm.isBusy = true;
                if (vm.isNew) {
                    $http.post("/Api/Class/" + vm.nursery.id, vm.class)
                        .then(function (response) {
                            toastr.success("Trieda " + vm.class.name + " bola úspešne vytvorená");
                            $location.path("#/");
                        }, function () {
                            toastr.error("Triedu sa nepodarilo vytvoriť");
                        }).finally(function () {
                            vm.isBusy = false;
                        });
                }
                else {
                    $http.put("/Api/Class/" + vm.nursery.id, vm.class)
                        .then(function (response) {
                            toastr.success("Zmeny v triede " + vm.class.name + " boli úspešne uložené");
                            $location.path("#/");
                        }, function () {
                            toastr.error("Triedu sa nepodarilo uložiť");
                        }).finally(function () {
                            vm.isBusy = false;
                        });
                }
            }
        }

        vm.deleteClassModal = function () {
           $scope.deleteModalTarget = "triedu " + vm.class.name;

            var modalInstance = $uibModal.open({
                templateUrl: '/app/common/templates/delete-modal.template.html',
                controller: 'DeleteModalController',
                scope:$scope
            });

            modalInstance.result.then(function () {
                vm.deleteClass();
            });
        }

        vm.deleteClass = function () {
            vm.isBusy = true;
            var className = vm.class.name;
            $http.delete("/Api/Class/" + vm.class.id)
                .then(function () {                    
                    toastr.success("Trieda " + className + " bola vymazaná");
                   $scope.back();
                }, function (error) {
                    toastr.error("Triedu sa nepodarilo vymazať");
                })
                .finally(function () {
                    vm.isBusy = false;
                });
        }
    }
})();
(function (angular) {
    "use strict";

    EmployeeDetailController.$inject = ["$scope", "$rootScope", "$http", "$location", "$routeParams", "$sce", "$controller"];
    angular.module("app.nursery")
        .controller("EmployeeDetailController", EmployeeDetailController);

    function EmployeeDetailController($scope, $rootScope, $http, $location, $routeParams, $sce, $controller) {
        $controller('BaseController', {
            '$scope':$scope
        });

        var vm = this;
        vm.employeeId = $routeParams.id;
        vm.nurseryId = $rootScope.nursery.id;
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
                toastr.error("Nepodarilo sa načítať informácie o zamestnancovi:<br/>");
            }).finally(function () {
                vm.isBusy = false;
            });

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
(function (angular) {
    "use strict";

    EmployeeEditController.$inject = ["$scope", "$rootScope", "$http", "$routeParams", "$controller", "$uibModal"];
    angular.module("app.nursery")
        .controller("EmployeeEditController", EmployeeEditController);

    function EmployeeEditController($scope, $rootScope, $http, $routeParams, $controller, $uibModal) {
        $controller('BaseController', {
            '$scope':$scope
        });

        var vm = this;
        vm.employeeId = $routeParams.id;
        vm.nurseryId = $rootScope.nursery.id;
        vm.employee = {};
        vm.isNew = vm.employeeId == 0;
        $scope.attendance = [{ id: 0, name: 'Žiadateľ' }, { id: 1, name: 'Pracujúci' }, { id: 2, name: 'Odstúpený' }];
        $scope.employmentTypes = [{ value: 'Dohoda' }, { value: 'Plný úväzok' }, { value: 'Študentská dohoda' }, { value: 'Skrátený úväzok' }, { value: 'Živnosť' }];

        if (!vm.isNew) {
            vm.isBusy = true;
            $http.get("/Api/Employee/" + vm.employeeId)
                .then(function (response) {
                    angular.copy(response.data, vm.employee);
                }, function () {
                    toastr.error("Nepodarilo sa načítať informácie o zamestnancovi");
                }).finally(function () {
                    vm.isBusy = false;
                });
        }

        vm.saveEmployee = function (isValid) {
            if (isValid) {
                vm.isBusy = true;

                if (vm.isNew) {
                    $http.post("/Api/Employee/" + vm.nurseryId, vm.employee)
                        .then(function (response) {
                            toastr.success("Zamestnanec " + vm.employee.fullName + " bol úspešne vytvorený");
                           $scope.back();
                        }, function () {
                            toastr.error("Zamestnanca sa nepodarilo vytvoriť");
                        }).finally(function () {
                            vm.isBusy = false;
                        });
                }
                else {
                    $http.put("/Api/Employee/" + vm.nurseryId, vm.employee)
                        .then(function (response) {
                            toastr.success("Zmeny v zamestnancovi " + vm.employee.fullName + " boli úspešne uložené");
                           $scope.back();
                        }, function () {
                            toastr.error("Zamestnanca sa nepodarilo uložiť");
                        }).finally(function () {
                            vm.isBusy = false;
                        });
                }
            }
        }

        vm.deleteEmployeeModal = function () {
           $scope.deleteModalTarget = "zamestnanca " + vm.employee.fullName;

            var modalInstance = $uibModal.open({
                templateUrl: '/app/common/templates/delete-modal.template.html',
                controller: 'DeleteModalController',
                scope:$scope
            });

            modalInstance.result.then(function () {
                vm.deleteEmployee();
            });
        }

        vm.deleteEmployee = function () {
            vm.isBusy = true;
            $http.delete("/Api/Employee/" + vm.employee.id)
                .then(function () {
                    toastr.success("Zamestnanec bol vymazaný");
                   $scope.back();
                }, function (error) {
                    toastr.error("Zamestnanca sa nepodarilo vymazať");
                })
                .finally(function () {
                    vm.isBusy = false;
                });
        }
    }
})(angular);
(function (angular) {
    "use strict";

    EmployeesListController.$inject = ["$scope", "$http", "$window", "$controller", "$rootScope"];
    angular.module("app.nursery")
        .controller("EmployeesListController", EmployeesListController);

    function EmployeesListController($scope, $http, $window, $controller, $rootScope) {
        $controller('BaseController', {
            '$scope':$scope
        });

        var vm = this;
        vm.nurseryId = $rootScope.nursery.id;
        vm.employees = [];
        vm.isBusy = true;
        vm.editing = false;
        vm.editedEmp = {};
        $scope.attendance = [{ id: 0, name: 'Žiadateľ' }, { id: 1, name: 'Pracujúci' }, { id: 2, name: 'Odstúpený' }];

        activate();

        function activate() {
            $http.get("/Api/Nursery/" + vm.nurseryId + "/employees")
                .then(function (response) {
                    angular.copy(response.data, vm.employees);
                    _.each(vm.employees, function (employee) {
                        employee.editMode = false;
                    });
                }, function (error) {
                    toastr.error("Nepodarilo sa načítať zoznam zamestnancov");
                })
                .finally(function () {
                    vm.isBusy = false;
                });
        }
        
        vm.activateEditMode = function (employee) {
            if (!vm.editing && $scope.canEdit && $window.outerWidth > 768) {
                angular.copy(employee, vm.editedEmp);
                vm.setEditMode(employee.id, true);
            }
        }

        vm.closeEditMode = function (id) {
            vm.setEditMode(id, false);
            vm.editedEmp = {};
        }

        vm.setEditMode = function (id, value, copy) {
            _.find(vm.employees, function (employee) {
                if (employee.id == id) {
                    employee.editMode = value;
                    vm.editing = value;
                    if (copy) {
                        angular.copy(vm.editedEmp, employee);
                    }
                }
            });
        }

        vm.saveEmployee = function (employee) {
            var isValid = true;

            if (isValid) {
                vm.isBusy = true;

                $http.put("/Api/Employee/" + vm.nurseryId, employee)
                    .then(function (response) {
                        toastr.success("Zmeny v zamestnancovi " + employee.fullName + " boli úspešne uložené");
                        vm.setEditMode(employee.id, false, true);
                    }, function () {
                        toastr.error("Zamestnanca sa nepodarilo uložiť");
                    }).finally(function () {
                        vm.isBusy = false;
                    });
            }
        }
    }
})(angular);
(function (angular) {

    "use strict";

    NurseriesListController.$inject = ["$http", "$scope", "$window", "$location", "$rootScope"];
    angular.module("app.nursery")
        .controller("NurseriesListController", NurseriesListController);

    function NurseriesListController($http, $scope, $window, $location, $rootScope) {
        var vm = this;
        vm.nurseries = [];
        vm.isBusy = true;

        activate();

        function activate() {
            $http.get("/Api/Nurseries")
                .then(function (response) {
                    angular.copy(response.data, vm.nurseries);
                    $rootScope.nursery = null;
                }, function (error) {
                    toastr.error("Nepodarilo sa načítať dáta: " + error);
                })
                .finally(function () {
                    vm.isBusy = false;
                });
        }
        
        vm.nurseryDblClick = function (nursery) {
            $window.location = "/App/" + nursery.id ;
        }
    }
})(angular);
(function (angular) {
    "use strict";

    NurseryAdminEditController.$inject = ["$routeParams", "$http", "$location", "$uibModal", "$scope"];
    angular.module("app.nursery")
        .controller("NurseryAdminEditController", NurseryAdminEditController);

    function NurseryAdminEditController($routeParams, $http, $location, $uibModal,$scope) {
        var vm = this;
        vm.nurseryId = parseInt($routeParams.id);
        vm.nursery = {};
        vm.isNew = vm.id == 0;

        if (!vm.isNew) {
            vm.isBusy = true;
            $http.get("/Api/Nursery/" + vm.nurseryId)
                .then(function (response) {
                    angular.copy(response.data, vm.nursery);
                }, function () {
                    toastr.error("Nepodarilo sa načítať informácie o škôlke");
                }).finally(function () {
                    vm.isBusy = false;
                });
        }

        vm.saveNursery = function () {
            vm.isBusy = true;

            if (vm.isNew) {
                $http.post("/Api/Nursery", vm.nursery)
                    .then(function (response) {
                        toastr.success("Bola vytvorená nová škôlka " + vm.nursery.name);
                        $location.path("#/");
                    }, function () {
                        toastr.error("Škôlku sa nepodarilo uložiť");
                    }).finally(function () {
                        vm.isBusy = false;
                    });
            }
            else
            {
                $http.put("/Api/Nursery/", vm.nursery)
                    .then(function (response) {
                        toastr.success("Zmeny v škôlke " + vm.nursery.name + " boli úspešne uložené");
                        $location.path("#/");
                    }, function () {
                        toastr.error("Škôlku sa nepodarilo uložiť");
                    }).finally(function () {
                        vm.isBusy = false;
                    });
            }
        }

        vm.deleteNurseryModal = function () {
           $scope.deleteModalTarget = "škôlku " + vm.nursery.name;

            var modalInstance = $uibModal.open({
                templateUrl: '/app/common/templates/delete-modal.template.html',
                controller: 'DeleteModalController',
                scope:$scope
            });

            modalInstance.result.then(function () {
                vm.deleteNursery();
            });
        }

        vm.deleteNursery = function () {
            vm.isBusy = true;
            var nurseryName = vm.nursery.name;
            $http.delete("/Api/Nursery/" + vm.nursery.id)
                .then(function () {
                    toastr.success("Škôlka " + nurseryName + " bola vymazaná");
                    $location.path("#/");
                }, function (error) {
                    toastr.error("Škôlku " + nurseryName + " sa nepodarilo vymazať");
                })
                .finally(function () {
                    vm.isBusy = false;
                });
        }
    }
})(angular);
(function (angular) {

    "use strict";

    NurseryDetailController.$inject = ["$scope", "$rootScope", "$http", "$location", "$window", "$controller"];
    angular.module("app.nursery")
        .controller("NurseryDetailController", NurseryDetailController);

    function NurseryDetailController($scope, $rootScope, $http, $location, $window, $controller) {
        $controller('BaseController', {
            '$scope':$scope
        });

        var vm = this;
        
        vm.nursery = {};
        vm.isBusy = true;
        $scope.sortType = 'title';
        $scope.sortReverse = true;

        activate()

        function activate() {
            if ($rootScope.nursery != null) {
                vm.nurseryId = $rootScope.nursery.id;
                getNursery();
            } else {
                $location.path("/nurseries");
            }
        }

        function getNursery() {
            $http.get("/Api/Nursery/" + vm.nurseryId)
                .then(function (response) {
                    angular.copy(response.data, vm.nursery);
                    if (vm.nursery.classes.length > 0) {
                        vm.isBusy = true;
                        for (var i = 0; i < vm.nursery.classes.length; i++) {
                            getClass(i);
                        }
                    }
                }, function () {
                    toastr.error("Nepodarilo sa načítať informácie o škôlke");
                }).finally(function () {
                    vm.isBusy = false;
                });
        }

        function getClass(i) {
            $http.get("/Api/Class/" + vm.nursery.classes[i].id)
                .then(function (response) {
                    for (var j = 0; j < response.data.children.length; j++)
                        if (response.data.children[j].attendance == 1)
                            vm.nursery.classes[i].children.push(response.data.children[j]);
                }, function () {
                    toastr.error("Nepodarilo sa načítať informácie o triede");
                });
        }
    }
})(angular);
(function (angular) {
    "use strict";

    NurseryEditController.$inject = ["$scope", "$http", "$location", "$controller", "$rootScope"];
    angular.module("app.nursery")
        .controller("NurseryEditController", NurseryEditController);

    function NurseryEditController($scope, $http, $location, $controller, $rootScope) {
        $controller('BaseController', {
            '$scope':$scope
        });

        var vm = this;
        vm.nurseryId = $rootScope.nursery.id;
        vm.nursery = {};
        vm.isBusy = true;

        $http.get("/Api/Nursery/" + vm.nurseryId)
            .then(function (response) {
                angular.copy(response.data, vm.nursery);
            }, function () {
                toastr.error("Nepodarilo sa načítať informácie o škôlke");
            }).finally(function () {
                vm.isBusy = false;
            });

        vm.saveNursery = function (isValid) {
            if (isValid) {
                vm.isBusy = true;
                $http.put("/Api/Nursery/", vm.nursery)
                    .then(function (response) {
                        toastr.success("Zmeny v škôlke " + vm.nursery.name + " boli úspešne uložené");
                        $location.path("#/");
                    }, function () {
                        toastr.error("Škôlku sa nepodarilo uložiť");
                    }).finally(function () {
                        vm.isBusy = false;
                    });
            }
        }
    }
})(angular);
(function (angular) {
    "use strict";

    UserEditModalController.$inject = ["$scope", "$uibModalInstance"];
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
(function (angular) {

    "use strict";

    UsersListController.$inject = ["$http", "$scope", "$window", "$uibModal"];
    angular
        .module("app.nursery")
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
            });

        vm.getRoles = function () {
            $http.get("/Api/Roles")
                .then(function (response) {
                    angular.copy(response.data, vm.roles);
                    vm.getNurseries();
                }, function (error) {
                    toastr.error("Nepodarilo sa načítať dáta: " + error);
                });
        }

        vm.getNurseries = function () {
            $http.get("/Api/Nurseries")
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
(function (angular) {
    "use strict";

    BaseController.$inject = ["$scope", "$window"];
    angular
        .module("common")
        .controller("BaseController", BaseController);

    function BaseController($scope, $window) {
       $scope.redirect = function (path) {
            $window.location.href = path;
        }

       $scope.back = function () {
            $window.history.back();
        };

       $scope.back2 = function () {
            $window.history.go(-2);
        };

       $scope.exportAction = function (exportTo) {
            switch (exportTo) {
                case 'excel':$scope.$broadcast('export-excel', {});
                    break;
                case 'doc':$scope.$broadcast('export-doc', {});
                    break;
                default: console.log('no event caught');
            }
        }
    }

})(angular);
(function (angular) {
    "use strict";

    DeleteModalController.$inject = ["$scope", "$uibModalInstance"];
    angular
        .module("common")
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
(function (angular) {
    "use strict";

    backButton.$inject = ["$window"];
    angular
        .module("common")
        .directive("backButton", backButton);

    function backButton($window) {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            templateUrl: '/app/common/templates/back-button.template.html'
        };
    }

})(angular);
(function (angular) {
    "use strict";

    angular
        .module("common")
        .directive('backToTop', backToTop);

    function backToTop() {
        return {
            restrict: 'E',
            transclude: true,
            replace: true,
            template: '<div id="backtop"><a title="Späť na začiatok"><i class="fa fa-2x fa-chevron-up"></a></div>',
            link: function (scope, element) {
                scope.speed = 600;

                scope.currentYPosition = function () {
                    if (this.pageYOffset)
                        return this.pageYOffset;
                    if (document.documentElement && document.documentElement.scrollTop)
                        return document.documentElement.scrollTop;
                    if (document.body.scrollTop)
                        return document.body.scrollTop;
                    return 0;
                };

                scope.smoothScroll = function () {
                    var startY = scope.currentYPosition();
                    var stopY = 0;
                    var distance = stopY > startY ? stopY - startY : startY - stopY;
                    if (distance < 100) {
                        scrollTo(0, stopY);
                        return;
                    }
                    var speed = Math.round(scope.speed / 100);
                    var step = Math.round(distance / 25);
                    var leapY = stopY > startY ? startY + step : startY - step;
                    var timer = 0;
                    if (stopY > startY) {
                        for (var i = startY; i < stopY; i += step) {
                            setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
                            leapY += step;
                            if (leapY > stopY) leapY = stopY;
                            timer++;
                        }
                        return;
                    }
                    for (var j = startY; j > stopY; j -= step) {
                        setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
                        leapY -= step;
                        if (leapY < stopY) leapY = stopY;
                        timer++;
                    }
                };

                scope.button = element.find('a');

                scope.button.on('click', function () {
                    scope.smoothScroll();
                    element.removeClass('show');
                });

                window.addEventListener('scroll', function () {
                    if (window.pageYOffset > 0) {
                        element.addClass('show');
                    } else {
                        element.removeClass('show');
                    }
                });
            }
        };
    }

})(angular);
(function (angular) {
    "use strict";

    capitalizeAllFirst.$inject = ["$parse"];
    angular.module("common")
        .directive('capitalizeAllFirst', capitalizeAllFirst);

    function capitalizeAllFirst($parse) {
        return {
            restrict: "A",
            require: 'ngModel',
            link: function (scope, element, attrs, modelCtrl) {
                var capitalize = function (inputValue) {
                    if (inputValue === undefined) { inputValue = ''; }
                    var capitalized = inputValue.replace(/[^-'\s]+/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substring(1); });
                    if (capitalized !== inputValue) {
                        modelCtrl.$setViewValue(capitalized);
                        modelCtrl.$render();
                    }
                    return capitalized;
                }
                modelCtrl.$parsers.push(capitalize);
                capitalize($parse(attrs.ngModel)(scope)); // capitalize initial value
            }
        };
    }

})(angular);
(function (angular) {
    "use strict";

    capitalizeFirst.$inject = ["$parse"];
    angular.module("common")
        .directive('capitalizeFirst', capitalizeFirst);

    function capitalizeFirst($parse) {
        return {
            restrict: "A",
            require: 'ngModel',
            link: function (scope, element, attrs, modelCtrl) {
                var capitalize = function (inputValue) {
                    if (inputValue === undefined) { inputValue = ''; }
                    var capitalized = inputValue.charAt(0).toUpperCase() + inputValue.substring(1);
                    if (capitalized !== inputValue) {
                        modelCtrl.$setViewValue(capitalized);
                        modelCtrl.$render();
                    }
                    return capitalized;
                }
                modelCtrl.$parsers.push(capitalize);
                capitalize($parse(attrs.ngModel)(scope)); // capitalize initial value
            }
        };
    }

})(angular);
(function (angular) {
    "use strict";

    angular
        .module("common")
        .directive("createdModified", createdModified);

    function createdModified() {
        return {
            restrict: "E",
            scope: {
                model: '='
            },
            templateUrl: "/app/common/templates/created-modified.template.html"
        };
    }

})(angular);
(function (angular) {
    "use strict";

    dropdownMultiselect.$inject = ["$filter", "$document", "$compile", "$parse"];
    angular
        .module("common")
        .directive('dropdownMultiselect', dropdownMultiselect);

    function dropdownMultiselect($filter, $document, $compile, $parse) {
        return {
            restrict: 'AE',
            scope: {
                selectedModel: '=',
                options: '=',
                extraSettings: '=',
                events: '=',
                searchFilter: '=?',
                translationTexts: '=',
                groupBy: '@'
            },
            template: function (element, attrs) {
                var checkboxes = attrs.checkboxes ? true : false;
                var groups = attrs.groupBy ? true : false;

                var template = '<div class="multiselect-parent btn-group dropdown-multiselect">';
                template += '<button type="button" class="dropdown-toggle" ng-class="settings.buttonClasses" ng-click="toggleDropdown()">{{getButtonText()}}</button>';
                template += '<ul class="dropdown-menu dropdown-menu-form" ng-style="{display: open ? \'block\' : \'none\', height : settings.scrollable ? settings.scrollableHeight : \'auto\' }" style="overflow: none" >';
                template += '<li ng-hide="!settings.showCheckAll || settings.selectionLimit > 0"><a data-ng-click="selectAll()"><span class="glyphicon glyphicon-ok"></span>  {{texts.checkAll}}</a>';
                template += '<li ng-show="settings.showUncheckAll"><a data-ng-click="deselectAll();"><span class="glyphicon glyphicon-remove"></span>   {{texts.uncheckAll}}</a></li>';
                template += '<li ng-hide="(!settings.showCheckAll || settings.selectionLimit > 0) && !settings.showUncheckAll" class="divider"></li>';
                template += '<li ng-show="settings.enableSearch"><div class="dropdown-header"><input type="text" class="form-control" style="width: 100%;" ng-model="searchFilter" placeholder="{{texts.searchPlaceholder}}" /></li>';
                template += '<li ng-show="settings.enableSearch" class="divider"></li>';

                if (groups) {
                    template += '<li ng-repeat-start="option in orderedItems | filter: searchFilter" ng-show="getPropertyForObject(option, settings.groupBy) !== getPropertyForObject(orderedItems[$index - 1], settings.groupBy)" role="presentation" class="dropdown-header">{{ getGroupTitle(getPropertyForObject(option, settings.groupBy)) }}</li>';
                    template += '<li ng-repeat-end role="presentation">';
                } else {
                    template += '<li role="presentation" ng-repeat="option in options | filter: searchFilter">';
                }

                template += '<a role="menuitem" tabindex="-1" ng-click="setSelectedItem(getPropertyForObject(option,settings.idProp))">';

                if (checkboxes) {
                    template += '<div class="checkbox"><label><input class="checkboxInput" type="checkbox" ng-click="checkboxClick($event, getPropertyForObject(option,settings.idProp))" ng-checked="isChecked(getPropertyForObject(option,settings.idProp))" /> {{getPropertyForObject(option, settings.displayProp)}}</label></div></a>';
                } else {
                    template += '<span data-ng-class="{\'glyphicon glyphicon-ok\': isChecked(getPropertyForObject(option,settings.idProp))}"></span> {{getPropertyForObject(option, settings.displayProp)}}</a>';
                }

                template += '</li>';

                template += '<li class="divider" ng-show="settings.selectionLimit > 1"></li>';
                template += '<li role="presentation" ng-show="settings.selectionLimit > 1"><a role="menuitem">{{selectedModel.length}} {{texts.selectionOf}} {{settings.selectionLimit}} {{texts.selectionCount}}</a></li>';

                template += '</ul>';
                template += '</div>';

                element.html(template);
            },
            link: function ($scope, $element, $attrs) {
                var $dropdownTrigger = $element.children()[0];

               $scope.toggleDropdown = function () {
                   $scope.open = !$scope.open;
                };

               $scope.checkboxClick = function ($event, id) {
                   $scope.setSelectedItem(id);
                    $event.stopImmediatePropagation();
                };

               $scope.externalEvents = {
                    onItemSelect: angular.noop,
                    onItemDeselect: angular.noop,
                    onSelectAll: angular.noop,
                    onDeselectAll: angular.noop,
                    onInitDone: angular.noop,
                    onMaxSelectionReached: angular.noop
                };

               $scope.settings = {
                    dynamicTitle: true,
                    scrollable: false,
                    scrollableHeight: '300px',
                    closeOnBlur: true,
                    displayProp: 'name',
                    idProp: 'id',
                    externalIdProp: 'id',
                    enableSearch: false,
                    selectionLimit: 0,
                    showCheckAll: false,
                    showUncheckAll: false,
                    closeOnSelect: false,
                    buttonClasses: 'form-control',
                    closeOnDeselect: false,
                    groupBy: $attrs.groupBy || undefined,
                    groupByTextProvider: null,
                    smartButtonMaxItems: 0,
                    smartButtonTextConverter: angular.noop
                };

               $scope.texts = {
                    checkAll: 'Označ všetko',
                    uncheckAll: 'Odznač všetko',
                    selectionCount: 'checked',
                    selectionOf: '/',
                    searchPlaceholder: 'Hľadaj...',
                    buttonDefaultText: 'Vyber si z možností',
                    dynamicButtonTextSuffix: 'checked'
                };

               $scope.searchFilter =$scope.searchFilter || '';

                if (angular.isDefined($scope.settings.groupBy)) {
                   $scope.$watch('options', function (newValue) {
                        if (angular.isDefined(newValue)) {
                           $scope.orderedItems = $filter('orderBy')(newValue,$scope.settings.groupBy);
                        }
                    });
                }

                angular.extend($scope.settings,$scope.extraSettings || []);
                angular.extend($scope.externalEvents,$scope.events || []);
                angular.extend($scope.texts,$scope.translationTexts);

               $scope.singleSelection =$scope.settings.selectionLimit === 1;

                function getFindObj(id) {
                    var findObj = {};

                    if ($scope.settings.externalIdProp === '') {
                        findObj[$scope.settings.idProp] = id;
                    } else {
                        findObj[$scope.settings.externalIdProp] = id;
                    }

                    return findObj;
                }

                function clearObject(object) {
                    for (var prop in object) {
                        delete object[prop];
                    }
                }

                if ($scope.singleSelection) {
                    if (angular.isArray($scope.selectedModel) &&$scope.selectedModel.length === 0) {
                        clearObject($scope.selectedModel);
                    }
                }

                if ($scope.settings.closeOnBlur) {
                    $document.on('click', function (e) {
                        var target = e.target.parentElement;
                        var parentFound = false;

                        while (angular.isDefined(target) && target !== null && !parentFound) {
                            if (_.contains(target.className.split(' '), 'multiselect-parent') && !parentFound) {
                                if (target === $dropdownTrigger) {
                                    parentFound = true;
                                }
                            }
                            target = target.parentElement;
                        }

                        if (!parentFound) {
                           $scope.$apply(function () {
                               $scope.open = false;
                            });
                        }
                    });
                }

               $scope.getGroupTitle = function (groupValue) {
                    if ($scope.settings.groupByTextProvider !== null) {
                        return $scope.settings.groupByTextProvider(groupValue);
                    }

                    return groupValue;
                };

               $scope.getButtonText = function () {
                    if ($scope.settings.dynamicTitle && ($scope.selectedModel.length > 0 || (angular.isObject($scope.selectedModel) && _.keys($scope.selectedModel).length > 0))) {
                        if ($scope.settings.smartButtonMaxItems > 0) {
                            var itemsText = [];

                            angular.forEach($scope.options, function (optionItem) {
                                if ($scope.isChecked($scope.getPropertyForObject(optionItem,$scope.settings.idProp))) {
                                    var displayText =$scope.getPropertyForObject(optionItem,$scope.settings.displayProp);
                                    var converterResponse =$scope.settings.smartButtonTextConverter(displayText, optionItem);

                                    itemsText.push(converterResponse ? converterResponse : displayText);
                                }
                            });

                            if ($scope.selectedModel.length >$scope.settings.smartButtonMaxItems) {
                                itemsText = itemsText.slice(0,$scope.settings.smartButtonMaxItems);
                                itemsText.push('...');
                            }

                            return itemsText.join(', ');
                        } else {
                            var totalSelected;

                            if ($scope.singleSelection) {
                                totalSelected = ($scope.selectedModel !== null && angular.isDefined($scope.selectedModel[$scope.settings.idProp])) ? 1 : 0;
                            } else {
                                totalSelected = angular.isDefined($scope.selectedModel) ?$scope.selectedModel.length : 0;
                            }

                            if (totalSelected === 0) {
                                return $scope.texts.buttonDefaultText;
                            } else {
                                return totalSelected + ' ' +$scope.texts.dynamicButtonTextSuffix;
                            }
                        }
                    } else {
                        return $scope.texts.buttonDefaultText;
                    }
                };

               $scope.getPropertyForObject = function (object, property) {
                    if (angular.isDefined(object) && object.hasOwnProperty(property)) {
                        return object[property];
                    }

                    return '';
                };

               $scope.selectAll = function () {
                   $scope.deselectAll(false);
                   $scope.externalEvents.onSelectAll();

                    angular.forEach($scope.options, function (value) {
                       $scope.setSelectedItem(value[$scope.settings.idProp], true);
                    });
                };

               $scope.deselectAll = function (sendEvent) {
                    sendEvent = sendEvent || true;

                    if (sendEvent) {
                       $scope.externalEvents.onDeselectAll();
                    }

                    if ($scope.singleSelection) {
                        clearObject($scope.selectedModel);
                    } else {
                       $scope.selectedModel.splice(0,$scope.selectedModel.length);
                    }
                };

               $scope.setSelectedItem = function (id, dontRemove) {
                    var findObj = getFindObj(id);
                    var finalObj = null;

                    if ($scope.settings.externalIdProp === '') {
                        finalObj = _.find($scope.options, findObj);
                    } else {
                        finalObj = findObj;
                    }

                    if ($scope.singleSelection) {
                        clearObject($scope.selectedModel);
                        angular.extend($scope.selectedModel, finalObj);
                       $scope.externalEvents.onItemSelect(finalObj);

                        return;
                    }

                    dontRemove = dontRemove || false;

                    var exists = _.findIndex($scope.selectedModel, findObj) !== -1;

                    if (!dontRemove && exists) {
                       $scope.selectedModel.splice(_.findIndex($scope.selectedModel, findObj), 1);
                       $scope.externalEvents.onItemDeselect(findObj);
                    } else if (!exists && ($scope.settings.selectionLimit === 0 ||$scope.selectedModel.length <$scope.settings.selectionLimit)) {
                       $scope.selectedModel.push(finalObj);
                       $scope.externalEvents.onItemSelect(finalObj);
                    }
                };

               $scope.isChecked = function (id) {
                    if ($scope.singleSelection) {
                        return $scope.selectedModel !== null && angular.isDefined($scope.selectedModel[$scope.settings.idProp]) &&$scope.selectedModel[$scope.settings.idProp] === getFindObj(id)[$scope.settings.idProp];
                    }

                    return _.findIndex($scope.selectedModel, getFindObj(id)) !== -1;
                };

               $scope.externalEvents.onInitDone();
            }
        };
    }

})(angular);
(function (angular) {
    "use strict";

    angular
        .module("common")
        .directive('exportTable', exportTable);

    function exportTable() {
        var link = function ($scope, elm, attr) {
           $scope.$on('export-excel', function (e, d) {
                elm.tableExport({ type: 'excel', escape: false });
            });
           $scope.$on('export-doc', function (e, d) {
                elm.tableExport({ type: 'doc', escape: false });
            });
        }

        return {
            restrict: 'C',
            link: link
        }
    }

})(angular);
(function (angular) {
    "use strict";

    angular
        .module("common")
        .directive("waitCursor", waitCursor);

    function waitCursor() {
        return {
            templateUrl: "/app/common/templates/wait-cursor.template.html"
        };
    }

})(angular);
(function (angular) {
    "use strict";

    angular
        .module("common")
        .filter('numberFixedLen', numberFixedLen);

    function numberFixedLen() {
        return function (a, b) {
            return (1e6 + a + "").slice(-b)
        }
    }

})(angular);
(function (angular) {
    "use strict";

    orderBySk.$inject = ["$parse"];
    angular
        .module("common")
        .filter('orderBySk', orderBySk);

    function orderBySk($parse) {
        return function (array, sortPredicate, reverseOrder) {
            if (!array || !angular.isArray(array)) return array;

            if (!angular.isArray(sortPredicate)) { sortPredicate = [sortPredicate]; }
            if (sortPredicate.length === 0) { sortPredicate = ['+']; }

            var predicates = processPredicates(sortPredicate, reverseOrder);

            predicates.push({ get: function () { return {}; }, descending: reverseOrder ? -1 : 1 });

            var compareValues = Array.prototype.map.call(array, getComparisonObject);
            compareValues.sort(doComparison);
            array = compareValues.map(function (item) { return item.value; });

            return array;

            function getComparisonObject(value, index) {
                return {
                    value: value,
                    predicateValues: predicates.map(function (predicate) {
                        return getPredicateValue(predicate.get(value), index);
                    })
                };
            }

            function doComparison(v1, v2) {
                var result = 0;
                for (var index = 0, length = predicates.length; index < length; ++index) {
                    result = compare(v1.predicateValues[index], v2.predicateValues[index], predicates[index].localeAware) * predicates[index].descending;
                    if (result) break;
                }
                return result;
            }
        };

        function processPredicates(sortPredicate, reverseOrder) {
            reverseOrder = reverseOrder ? -1 : 1;
            return sortPredicate.map(function (predicate) {
                var descending = 1, get = angular.identity, localeAware = false;

                if (angular.isFunction(predicate)) {
                    get = predicate;
                } else if (angular.isString(predicate)) {
                    if (predicate.charAt(0) == '@') {
                        localeAware = true;
                        predicate = predicate.substring(1);
                    }
                    if ((predicate.charAt(0) == '+' || predicate.charAt(0) == '-')) {
                        descending = predicate.charAt(0) == '-' ? -1 : 1;
                        predicate = predicate.substring(1);
                    }
                    if (predicate !== '') {
                        get = $parse(predicate);
                        if (get.constant) {
                            var key = get();
                            get = function (value) { return value[key]; };
                        }
                    }
                }
                return { get: get, descending: descending * reverseOrder, localeAware: localeAware };
            });
        }

        function isPrimitive(value) {
            switch (typeof value) {
                case 'number': /* falls through */
                case 'boolean': /* falls through */
                case 'string':
                    return true;
                default:
                    return false;
            }
        }

        function objectValue(value, index) {
            // If `valueOf` is a valid function use that
            if (typeof value.valueOf === 'function') {
                value = value.valueOf();
                if (isPrimitive(value)) return value;
            }
            // If `toString` is a valid function and not the one from `Object.prototype` use that
            if (hasCustomToString(value)) {
                value = value.toString();
                if (isPrimitive(value)) return value;
            }
            // We have a basic object so we use the position of the object in the collection
            return index;
        }

        function getPredicateValue(value, index) {
            var type = typeof value;
            if (value === null) {
                type = 'string';
                value = 'null';
            } else if (type === 'string') {
                value = value.toLowerCase();
            } else if (type === 'object') {
                value = objectValue(value, index);
            }
            return { value: value, type: type };
        }

        function compare(v1, v2) {
            var result = 0;
            if (v1.type === 'string') {
                result = v1.value.toString().localeCompare(v2.value.toString(), 'sk');
            } else {
                if (v1.type === v2.type) {
                    if (v1.value !== v2.value) {
                        result = v1.value < v2.value ? -1 : 1;
                    }
                } else {
                    result = v1.type < v2.type ? -1 : 1;
                }
            }
            return result;
        }

        function hasCustomToString(obj) {
            return angular.isFunction(obj.toString) && obj.toString !== Object.prototype.toString;
        }
    }

})(angular);