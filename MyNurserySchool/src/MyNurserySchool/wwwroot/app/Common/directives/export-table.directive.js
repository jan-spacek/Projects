(function (angular) {
    "use strict";

    angular
        .module("common")
        .directive('exportTable', exportTable);

    function exportTable() {
        var link = function ($scope, elm, attr) {
           $scope.$on('export-excel', function (e, d) {
                elm.tableExport({ type: 'excel', escape: false });
            });
           $scope.$on('export-doc', function (e, d) {
                elm.tableExport({ type: 'doc', escape: false });
            });
        }

        return {
            restrict: 'C',
            link: link
        }
    }

})(angular);