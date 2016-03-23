(function (angular) {
    "use strict";

    angular
        .module("app.controls")
        .filter('numberFixedLen', numberFixedLen);

    function numberFixedLen() {
        return function (a, b) {
            return (1e6 + a + "").slice(-b)
        }
    }

})(angular);