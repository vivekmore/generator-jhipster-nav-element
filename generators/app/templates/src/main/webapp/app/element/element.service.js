(function () {
    'use strict';

    angular
        .module('<%=angularAppName%>')
        .factory('<%=navElementKeyCapitalized%>Service', <%=navElementKeyCapitalized%>Service);

    <%=navElementKeyCapitalized%>Service.$inject = ['$resource'];

    function <%=navElementKeyCapitalized%>Service($resource) {
        var service = {
            getOrdinalIndicator: getOrdinalIndicator
        };

        return service;

        function getOrdinalIndicator(n) {

            if (n || n === 0) {

                if (hasANonGenericOrdinalIndicator(n)) {
                    return 'th';
                }

                var decimal = n % 10;
                switch (decimal) {
                    case 1:
                        return 'st';
                        break;
                    case 2:
                        return 'nd';
                        break;
                    case 3:
                        return 'rd';
                        break;
                    default:
                        return 'th';
                        break;
                }
            }

            return '';
        }

        function hasANonGenericOrdinalIndicator(n) {
            var lastTwoDigits = n % 100;
            return lastTwoDigits > 10 && lastTwoDigits < 14;
        }
    }
})();
