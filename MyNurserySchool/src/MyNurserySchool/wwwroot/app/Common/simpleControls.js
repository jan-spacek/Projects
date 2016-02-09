(function () {
    "use strict";

    angular.module("simpleControls", [])
        .directive("waitCursor", waitCursor)
        .directive("createdModified", createdModified);

    function waitCursor() {
        return {
            templateUrl: "/app/Common/waitCursor.html"
        };
    }

    function createdModified() {
        return {
            restrict: "E",
            scope: {
                model: '='
            },
            templateUrl: "/app/Common/createdModified.html"
        };
    }

})();