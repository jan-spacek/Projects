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