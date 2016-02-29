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
        .filter('numberFixedLen', numberFixedLen)
        .filter('orderBySK', orderBySK);

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

    function numberFixedLen() {
        return function (a, b) {
            return (1e4 + a + "").slice(-b)
        }
    }

    function orderBySK($parse) {
        return function (array, sortPredicate, reverseOrder) {
            if (!array || !angular.isArray(array)) return array;

            if (!angular.isArray(sortPredicate)) { sortPredicate = [sortPredicate]; }
            if (sortPredicate.length === 0) { sortPredicate = ['+']; }

            var predicates = processPredicates(sortPredicate, reverseOrder);
            // Add a predicate at the end that evaluates to the element index. This makes the
            // sort stable as it works as a tie-breaker when all the input predicates cannot
            // distinguish between two elements.
            predicates.push({ get: function () { return {}; }, descending: reverseOrder ? -1 : 1 });

            // The next three lines are a version of a Swartzian Transform idiom from Perl
            // (sometimes called the Decorate-Sort-Undecorate idiom)
            // See https://en.wikipedia.org/wiki/Schwartzian_transform
            var compareValues = Array.prototype.map.call(array, getComparisonObject);
            compareValues.sort(doComparison);
            array = compareValues.map(function (item) { return item.value; });

            return array;

            function getComparisonObject(value, index) {
                return {
                    value: value,
                    predicateValues: predicates.map(function (predicate) {
                        return getPredicateValue(predicate.get(value), index);
                    })
                };
            }

            function doComparison(v1, v2) {
                var result = 0;
                for (var index = 0, length = predicates.length; index < length; ++index) {
                    result = compare(v1.predicateValues[index], v2.predicateValues[index], predicates[index].localeAware) * predicates[index].descending;
                    if (result) break;
                }
                return result;
            }
        };

        function processPredicates(sortPredicate, reverseOrder) {
            reverseOrder = reverseOrder ? -1 : 1;
            return sortPredicate.map(function (predicate) {
                var descending = 1, get = angular.identity, localeAware = false;

                if (angular.isFunction(predicate)) {
                    get = predicate;
                } else if (angular.isString(predicate)) {
                    if (predicate.charAt(0) == '@') {
                        localeAware = true;
                        predicate = predicate.substring(1);
                    }
                    if ((predicate.charAt(0) == '+' || predicate.charAt(0) == '-')) {
                        descending = predicate.charAt(0) == '-' ? -1 : 1;
                        predicate = predicate.substring(1);
                    }
                    if (predicate !== '') {
                        get = $parse(predicate);
                        if (get.constant) {
                            var key = get();
                            get = function (value) { return value[key]; };
                        }
                    }
                }
                return { get: get, descending: descending * reverseOrder, localeAware: localeAware };
            });
        }

        function isPrimitive(value) {
            switch (typeof value) {
                case 'number': /* falls through */
                case 'boolean': /* falls through */
                case 'string':
                    return true;
                default:
                    return false;
            }
        }

        function objectValue(value, index) {
            // If `valueOf` is a valid function use that
            if (typeof value.valueOf === 'function') {
                value = value.valueOf();
                if (isPrimitive(value)) return value;
            }
            // If `toString` is a valid function and not the one from `Object.prototype` use that
            if (hasCustomToString(value)) {
                value = value.toString();
                if (isPrimitive(value)) return value;
            }
            // We have a basic object so we use the position of the object in the collection
            return index;
        }

        function getPredicateValue(value, index) {
            var type = typeof value;
            if (value === null) {
                type = 'string';
                value = 'null';
            } else if (type === 'string') {
                value = value.toLowerCase();
            } else if (type === 'object') {
                value = objectValue(value, index);
            }
            return { value: value, type: type };
        }

        function compare(v1, v2) {
            var result = 0;
            if (v1.type === 'string') {
                result = v1.value.toString().localeCompare(v2.value.toString(), 'sk');
            } else {
                if (v1.type === v2.type) {
                    if (v1.value !== v2.value) {
                        result = v1.value < v2.value ? -1 : 1;
                    }
                } else {
                    result = v1.type < v2.type ? -1 : 1;
                }
            }
            return result;
        }

        function hasCustomToString(obj) {
            return angular.isFunction(obj.toString) && obj.toString !== Object.prototype.toString;
        }
    }
})();