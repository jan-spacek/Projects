(function (angular) {
    "use strict";

    angular
        .module("app.controls")
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