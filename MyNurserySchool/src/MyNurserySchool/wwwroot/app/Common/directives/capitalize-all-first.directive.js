(function (angular) {
    "use strict";

    angular.module("common")
        .directive('capitalizeAllFirst', capitalizeAllFirst);

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

})(angular);