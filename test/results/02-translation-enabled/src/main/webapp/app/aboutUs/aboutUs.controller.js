(function () {
    'use strict';

    angular
        .module('myappApp')
        .controller('AboutUsController', AboutUsController);

    AboutUsController.$inject = ['$scope', 'AboutUsService'];

    function AboutUsController($scope, AboutUsService) {
        var vm = this;

        $scope.todayMessage = todayToString();

        vm.todayToString = todayToString;

        function todayToString() {
            var today = new Date();
            var dayName = today.toLocaleString('en-us', {weekday: 'long'});
            var monthName = today.toLocaleString('en-us', {month: 'long'});
            var date = today.getDate();

            return 'Today is ' + dayName + ', the ' + dateWithOrdinal(date) + ' of ' + monthName + ', ' + today.getFullYear();
        }

        function dateWithOrdinal(date) {
            return date + AboutUsService.getOrdinalIndicator(date);
        }

    }
})();
