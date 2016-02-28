(function () {
    "use strict";

    angular.module("simpleControls", [])
        .directive("waitCursor", waitCursor)
        .directive("createdModified", createdModified)
        .directive("backButton", backButton)
        .directive('capitalizeFirst', capitalizeFirst)
        .directive('capitalizeAllFirst', capitalizeAllFirst)
        .directive('exportTable', exportTable)
        .directive('backToTop', backToTop)
        .controller("baseController", baseController)
        .filter('numberFixedLen', numberFixedLen);

    function exportTable() {
        var link = function($scope, elm, attr){
            $scope.$on('export-excel', function(e, d){
                elm.tableExport({type:'excel', escape:false});
            });
            $scope.$on('export-doc', function(e, d){
                elm.tableExport({type: 'doc', escape:false});
            });
        }

        return {
            restrict: 'C',
            link: link
        }
    }

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

        $scope.exportAction = function(exportTo) { 
            switch (exportTo) {
                case 'excel': $scope.$broadcast('export-excel', {}); 
                    break; 
                case 'doc': $scope.$broadcast('export-doc', {});
                    break; 
                default: console.log('no event caught'); 
            }
        }
    }

    function backToTop() {
        return {
            restrict: 'E',
            transclude: true,
            replace: true,
            template: '<div id="backtop"><a title="Späť na začiatok"><i class="fa fa-2x fa-chevron-up"></a></div>',
            link: function (scope, element) {
                scope.speed = 600;
                
                scope.currentYPosition = function () {
                    if (this.pageYOffset)
                        return this.pageYOffset;
                    if (document.documentElement && document.documentElement.scrollTop)
                        return document.documentElement.scrollTop;
                    if (document.body.scrollTop)
                        return document.body.scrollTop;
                    return 0;
                };

                scope.smoothScroll = function () {
                    var startY = scope.currentYPosition();
                    var stopY = 0;
                    var distance = stopY > startY ? stopY - startY : startY - stopY;
                    if (distance < 100) {
                        scrollTo(0, stopY);
                        return;
                    }
                    var speed = Math.round(scope.speed / 100);
                    var step = Math.round(distance / 25);
                    var leapY = stopY > startY ? startY + step : startY - step;
                    var timer = 0;
                    if (stopY > startY) {
                        for (var i = startY; i < stopY; i += step) {
                            setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
                            leapY += step;
                            if (leapY > stopY) leapY = stopY;
                            timer++;
                        }
                        return;
                    }
                    for (var j = startY; j > stopY; j -= step) {
                        setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
                        leapY -= step;
                        if (leapY < stopY) leapY = stopY;
                        timer++;
                    }
                };

                scope.button = element.find('a');

                scope.button.on('click', function () {
                    scope.smoothScroll();
                    element.removeClass('show');
                });

                window.addEventListener('scroll', function () {
                    if (window.pageYOffset > 0) {
                        element.addClass('show');
                    } else {
                        element.removeClass('show');
                    }
                });
            }
        };
    }
})();