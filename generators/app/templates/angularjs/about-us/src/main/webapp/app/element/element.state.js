(function() {
    'use strict';

    angular
        .module('<%=angularAppName%>')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('<%=navElementKeyKebabCased%>', {
            parent: 'app',
            url: '/<%=navElementKeyKebabCased%>',
            data: {
                authorities: [],
                pageTitle: 'global.menu.<%=navElementKeyKebabCased%>'
            },
            views: {
                'content@': {
                    templateUrl: 'app/<%=navElementKeyKebabCased%>/<%=navElementKeyKebabCased%>.html',
                    controller: '<%=controllerName%>',
                    controllerAs: 'vm'
                }
            <%_ if (enableTranslation) {  _%>
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('<%=navElementTranslationPart%>');
                    return $translate.refresh();
                }]
            <%_ } _%>
            }
        });
    }
})();
