(function (angular) {
    "use strict";

    angular
        .module("common")
        .filter('numberFixedLen', numberFixedLen);

    function numberFixedLen() {
        return function (a, b) {
            return (1e6 + a + "").slice(-b)
        }
    }

})(angular);