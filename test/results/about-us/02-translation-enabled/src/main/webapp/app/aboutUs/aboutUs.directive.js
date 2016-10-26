(function () {
    'use strict';

    angular
        .module('myappApp')
        .directive('aboutToday', aboutToday);

    aboutToday.$inject = ['AboutUsService'];

    function aboutToday(AboutUsService) {

        var directive = {
            restrict: 'A',
            template: 'Today is {{weekday}}, the {{dateWithOrdinal}} of {{month}}, {{fullYear}}',
            link: linkFunc
        };

        return directive;

        function linkFunc(scope, element, attrs) {

            element.addClass('text-left');

            var today = new Date();
            var date = today.getDate();

            scope.weekday = today.toLocaleString('en-us', {weekday: 'long'});
            scope.dateWithOrdinal = date + AboutUsService.getOrdinalIndicator(date);
            scope.month = today.toLocaleString('en-us', {month: 'long'});
            scope.fullYear = today.getFullYear();
        }
    }
})();
