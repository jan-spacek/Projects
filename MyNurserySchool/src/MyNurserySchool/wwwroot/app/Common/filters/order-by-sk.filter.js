﻿(function (angular) {
    "use strict";

    angular
        .module("common")
        .filter('orderBySk', orderBySk);

    function orderBySk($parse) {
        return function (array, sortPredicate, reverseOrder) {
            if (!array || !angular.isArray(array)) return array;

            if (!angular.isArray(sortPredicate)) { sortPredicate = [sortPredicate]; }
            if (sortPredicate.length === 0) { sortPredicate = ['+']; }

            var predicates = processPredicates(sortPredicate, reverseOrder);

            predicates.push({ get: function () { return {}; }, descending: reverseOrder ? -1 : 1 });

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

})(angular);