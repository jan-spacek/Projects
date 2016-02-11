(function () {
    "use strict";

    angular.module("simpleControls", [])
        .directive("waitCursor", waitCursor)
        .directive("createdModified", createdModified)
        .directive("backButton", backButton)
        .controller("baseController", ['$scope', '$window', baseController]);

    function backButton($window) {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            templateUrl: '/app/Common/backButton.html'
        };
    }

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

    function baseController($scope, $window) {
        $scope.redirect = function (path) {
            $window.location.href = path;
        }

        $scope.back = function () {
            $window.history.back();
        };
    }

})();