(function () {
    "use strict";

    angular.module("simpleControls", [])
        .directive("waitCursor", waitCursor)
        .directive("createdModified", createdModified)
        .directive("backButton", backButton)
        .directive('capitalizeFirst', capitalizeFirst)
        .directive('capitalizeAllFirst', capitalizeAllFirst)
        .controller("baseController", baseController)
        .filter('numberFixedLen', numberFixedLen);

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

    function capitalizeFirst($parse) {
        return {
            restrict: "A",
            require: 'ngModel',
            link: function (scope, element, attrs, modelCtrl) {
                var capitalize = function (inputValue) {
                    if (inputValue === undefined) { inputValue = ''; }
                    var capitalized = inputValue.charAt(0).toUpperCase() + inputValue.substring(1);
                    if (capitalized !== inputValue) {
                        modelCtrl.$setViewValue(capitalized);
                        modelCtrl.$render();
                    }
                    return capitalized;
                }
                modelCtrl.$parsers.push(capitalize);
                capitalize($parse(attrs.ngModel)(scope)); // capitalize initial value
            }
        };
    }

    function capitalizeAllFirst($parse) {
        return {
            restrict: "A",
            require: 'ngModel',
            link: function (scope, element, attrs, modelCtrl) {
                var capitalize = function (inputValue) {
                    if (inputValue === undefined) { inputValue = ''; }
                    var capitalized = inputValue.replace(/[^-'\s]+/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substring(1); });
                    if (capitalized !== inputValue) {
                        modelCtrl.$setViewValue(capitalized);
                        modelCtrl.$render();
                    }
                    return capitalized;
                }
                modelCtrl.$parsers.push(capitalize);
                capitalize($parse(attrs.ngModel)(scope)); // capitalize initial value
            }
        };
    }

    function numberFixedLen() {
        return function (a, b) {
            return (1e4 + a + "").slice(-b)
        }
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