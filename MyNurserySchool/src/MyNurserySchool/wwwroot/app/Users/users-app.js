(function () {

    "use strict";

    angular.module("users-app", ["simpleControls", "ngRoute"])
        .config(function ($routeProvider) {
            $routeProvider.when("/", {
                controller: "userSettingsController",
                controllerAs: "vm",
                templateUrl: "/app/Users/userSettingsView.html"
            });

            $routeProvider.when("/password", {
                controller: "changePasswordController",
                controllerAs: "vm",
                templateUrl: "/app/Users/changePasswordView.html"
            });

            $routeProvider.when("/all", {
                controller: "usersListController",
                controllerAs: "vm",
                templateUrl: "/app/Users/usersListView.html"
            });

            $routeProvider.when("/edit/:id", {
                controller: "userEditController",
                controllerAs: "vm",
                templateUrl: "/app/Users/userEditView.html"
            });

            $routeProvider.otherwise({
                redirectTo: "/"
            });
        });

})();