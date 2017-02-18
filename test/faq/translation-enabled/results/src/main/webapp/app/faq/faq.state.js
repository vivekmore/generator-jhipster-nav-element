(function() {
    'use strict';

    angular
        .module('myappApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('faq', {
            parent: 'app',
            url: '/faq',
            data: {
                authorities: [],
                pageTitle: 'global.menu.faq'
            },
            views: {
                'content@': {
                    templateUrl: 'app/faq/faq.html',
                    controller: 'FaqController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('faq');
                    return $translate.refresh();
                }]
            }
        });
    }
})();
