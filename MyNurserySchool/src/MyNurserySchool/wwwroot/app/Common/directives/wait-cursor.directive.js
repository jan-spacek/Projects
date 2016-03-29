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