(function() {
    'use strict';

    angular
        .module('myappApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('aboutUs', {
            parent: 'app',
            url: '/aboutUs',
            data: {
                authorities: [],
                pageTitle: 'global.menu.aboutUs'
            },
            views: {
                'content@': {
                    templateUrl: 'app/aboutUs/aboutUs.html',
                    controller: 'AboutUsController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('aboutUs');
                    return $translate.refresh();
                }]
            }
        });
    }
})();
