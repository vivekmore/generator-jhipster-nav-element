(function() {
    'use strict';

    angular
        .module('myappApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('about-us', {
            parent: 'app',
            url: '/about-us',
            data: {
                authorities: [],
                pageTitle: 'global.menu.about-us'
            },
            views: {
                'content@': {
                    templateUrl: 'app/about-us/about-us.html',
                    controller: 'AboutUsController',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();
