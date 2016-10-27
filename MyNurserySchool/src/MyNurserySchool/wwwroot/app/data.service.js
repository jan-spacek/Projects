(function (angular) {
    "use strict";

    angular
        .module("app.nursery")
        .service("DataService", ["$http", DataService]);

    function DataService($http) {
        
        // Nursery
        this.getAllNurseries = function () {
            return $http.get("/api/nurseries");
        }
        this.getNursery = function (id) {
            return $http.get("/api/nursery/" + id);
        }
        this.insertNursery = function (nursery) {
            return $http.post("/api/nursery", nursery);
        }
        this.updateNursery = function (nursery) {
            return $http.put("/api/nursery", nursery);
        }
        this.deleteNursery = function (id) {
            return $http.delete("/api/nursery/" + id);
        }

        // Class
        this.getAllClasses = function (nurseryId) {
            return $http.get("/api/nursery/" + nurseryId + "/classes/");
        }
        this.getClass = function (id) {
            return $http.get("/api/class/" + id);
        }
        this.insertClass = function (nurseryId, cls) {
            return $http.post("/api/class/" + nurseryId, cls)
        }
        this.updateClass = function (nurseryId, cls) {
            return $http.put("/api/class/" + nurseryId, cls)
        }
        this.deleteClass = function (id) {
            return $http.delete("/api/class/" + id);
        }

        //Child
        this.getAllChildren = function (nurseryId) {
            return $http.get("/api/nursery/" + nurseryId + "/children");
        }
        this.getChild = function (id) {
            return $http.get("/api/child/" + id);
        }
        this.insertChild = function (child) {
            return $http.post("/api/child/", child)
        }
        this.updateChild = function (child) {
            return $http.put("/api/child/", child)
        }
        this.deleteChild = function (id) {
            return $http.delete("/api/child/" + id);
        }

        //Employee
        this.getAllEmployees = function (nurseryId) {
            return $http.get("/api/nursery/" + nurseryId + "/employees");
        }
        this.getEmployee = function (id) {
            return $http.get("/api/employee/" + id);
        }
        this.insertEmployee = function (nurseryId, employee) {
            return $http.post("/api/employee/" + nurseryId, employee)
        }
        this.updateEmployee = function (nurseryId, employee) {
            return $http.put("/api/employee/" + nurseryId, employee)
        }
        this.deleteEmployee = function (id) {
            return $http.delete("/api/employee/" + id);
        }

        //Note
        this.insertNote = function (note) {
            return $http.post("/api/note/", note)
        }
        this.deleteNote = function (id) {
            return $http.delete("/api/note/" + id);
        }

        //Roles
        this.getRoles = function () {
            return $http.get("/api/roles");
        }

        //Users
        this.getUsers = function () {
            return $http.get("/Api/Users");
        }
    };
})(angular);