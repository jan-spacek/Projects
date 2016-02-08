(function () {

    "use strict";

    angular.module("nursery-app", ["simpleControls", "ngRoute", "ngMaterial"])
        .config(function ($routeProvider, $mdDateLocaleProvider) {
            $routeProvider.when("/", {
                controller: "nurseryDetailController",
                controllerAs: "vm",
                templateUrl: "/views/Nursery/nurseryDetailView.html"
            });

            $routeProvider.when("/edit", {
                controller: "nurseryEditController",
                controllerAs: "vm",
                templateUrl: "/views/Nursery/nurseryEditView.html"
            });

            $routeProvider.when("/class/:id/edit", {
                controller: "classEditController",
                controllerAs: "vm",
                templateUrl: "/views/Nursery/classEditView.html"
            });

            $routeProvider.when("/employee/:id/edit", {
                controller: "employeeEditController",
                controllerAs: "vm",
                templateUrl: "/views/Nursery/employeeEditView.html"
            });

            $routeProvider.when("/class/:id", {
                controller: "classDetailController",
                controllerAs: "vm",
                templateUrl: "/views/Nursery/classDetailView.html"
            });

            $routeProvider.otherwise({
                redirectTo: "/"
            });

            // Example of a French localization.
            $mdDateLocaleProvider.months = ['január', 'február', 'marec', 'apríl', 'máj', 'jún', 'júl', 'august', 'september', 'október', 'november', 'december'];
            $mdDateLocaleProvider.shortMonths = ['jan', 'feb', 'mar', 'apr', 'máj', 'jún', 'júl', 'aug', 'sep', 'okt', 'nov', 'dec'];
            $mdDateLocaleProvider.days = ['nedeľa', 'pondelok', 'utorok', 'streda', 'štvrtok', 'piatok', 'sobota'];
            $mdDateLocaleProvider.shortDays = ['Ne', 'Po', 'Ut', 'St', 'Št', 'Pi', 'So'];
            // Can change week display to start on Monday.
            $mdDateLocaleProvider.firstDayOfWeek = 1;
            // In addition to date display, date components also need localized messages
            // for aria-labels for screen-reader users.
            $mdDateLocaleProvider.weekNumberFormatter = function(weekNumber) {
                return weekNumber + 'týždeň';
            };
            $mdDateLocaleProvider.msgCalendar = 'Kalendár';
            $mdDateLocaleProvider.msgOpenCalendar = 'Otvoriť kalendár';
        })
})();