(function (angular) {
    "use strict";

    angular
        .module("app.controls")
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