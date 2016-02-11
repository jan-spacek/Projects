(function () {

    "use strict";

    angular.module("nursery-app", ["simpleControls", "ngRoute", "ngMaterial"])
        .config(function ($routeProvider, $mdDateLocaleProvider) {
            $routeProvider.when("/", {
                controller: "nurseryDetailController",
                controllerAs: "vm",
                templateUrl: "/app/Nursery/nurseryDetailView.html"
            });

            $routeProvider.when("/edit", {
                controller: "nurseryEditController",
                controllerAs: "vm",
                templateUrl: "/app/Nursery/nurseryEditView.html"
            });

            $routeProvider.when("/class/:id/edit", {
                controller: "classEditController",
                controllerAs: "vm",
                templateUrl: "/app/Class/classEditView.html"
            });

            $routeProvider.when("/class/:id", {
                controller: "classDetailController",
                controllerAs: "vm",
                templateUrl: "/app/Class/classDetailView.html"
            });

            $routeProvider.when("/employee/:id/edit", {
                controller: "employeeEditController",
                controllerAs: "vm",
                templateUrl: "/app/Employee/employeeEditView.html"
            });

            $routeProvider.when("/employee/:id", {
                controller: "employeeDetailController",
                controllerAs: "vm",
                templateUrl: "/app/Employee/employeeDetailView.html"
            });

            $routeProvider.when("/child/:id/edit", {
                controller: "childEditController",
                controllerAs: "vm",
                templateUrl: "/app/Child/childEditView.html"
            });

            $routeProvider.when("/child/:id", {
                controller: "childDetailController",
                controllerAs: "vm",
                templateUrl: "/app/Child/childDetailView.html"
            });

            $routeProvider.when("/employees", {
                controller: "employeesListController",
                controllerAs: "vm",
                templateUrl: "/app/Lists/employeesListView.html"
            });

            $routeProvider.when("/children", {
                controller: "childrenListController",
                controllerAs: "vm",
                templateUrl: "/app/Lists/childrenListView.html"
            });

            $routeProvider.when("/children/waiting", {
                controller: "childrenListController",
                controllerAs: "vm",
                templateUrl: "/app/Lists/childrenWaitingListView.html"
            });

            $routeProvider.when("/children/archive", {
                controller: "childrenListController",
                controllerAs: "vm",
                templateUrl: "/app/Lists/childrenArchiveView.html"
            });

            $routeProvider.otherwise({
                redirectTo: "/"
            });

            $mdDateLocaleProvider.months = ['január', 'február', 'marec', 'apríl', 'máj', 'jún', 'júl', 'august', 'september', 'október', 'november', 'december'];
            $mdDateLocaleProvider.shortMonths = ['jan', 'feb', 'mar', 'apr', 'máj', 'jún', 'júl', 'aug', 'sep', 'okt', 'nov', 'dec'];
            $mdDateLocaleProvider.days = ['nedeľa', 'pondelok', 'utorok', 'streda', 'štvrtok', 'piatok', 'sobota'];
            $mdDateLocaleProvider.shortDays = ['Ne', 'Po', 'Ut', 'St', 'Št', 'Pi', 'So'];
            // Can change week display to start on Monday.
            $mdDateLocaleProvider.firstDayOfWeek = 1;
            // In addition to date display, date components also need localized messages
            // for aria-labels for screen-reader users.
            $mdDateLocaleProvider.weekNumberFormatter = function (weekNumber) {
                return weekNumber + 'týždeň';
            };
            $mdDateLocaleProvider.msgCalendar = 'Kalendár';
            $mdDateLocaleProvider.msgOpenCalendar = 'Otvoriť kalendár';
            $mdDateLocaleProvider.formatDate = function (date) {
                var date = new Date(date);
                var day = date.getDate();
                var month = date.getMonth() + 1;
                var year = date.getFullYear();
                return day + '.' + month + '.' + year;
            };
            $mdDateLocaleProvider.parseDate = function (dateString) {
                var day = dateString.substring(0, dateString.indexOf("."));
                var month = dateString.substring(dateString.indexOf(".") + 1, dateString.lastIndexOf("."));
                var year = dateString.substring(dateString.lastIndexOf(".") + 1);
                return new Date(year + "-" + month + "-" + day);
            };
        });
})();