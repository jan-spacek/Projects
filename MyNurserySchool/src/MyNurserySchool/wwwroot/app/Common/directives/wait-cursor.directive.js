(function (angular) {
    "use strict";

    angular
        .module("app.controls")
        .directive("waitCursor", waitCursor);

    function waitCursor() {
        return {
            templateUrl: "/app/common/templates/wait-cursor.template.html"
        };
    }

})(angular);