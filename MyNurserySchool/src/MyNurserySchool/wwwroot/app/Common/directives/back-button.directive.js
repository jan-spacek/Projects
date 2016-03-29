(function (angular) {
    "use strict";

    angular
        .module("common")
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