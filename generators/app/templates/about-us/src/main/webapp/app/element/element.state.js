(function() {
    'use strict';

    angular
        .module('<%=angularAppName%>')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('<%=navElementKeyCamelCased%>', {
            parent: 'app',
            url: '/<%=navElementKeyCamelCased%>',
            data: {
                authorities: [],
                pageTitle: 'global.menu.<%=navElementKeyCamelCased%>'
            },
            views: {
                'content@': {
                    templateUrl: 'app/<%=navElementKeyCamelCased%>/<%=navElementKeyCamelCased%>.html',
                    controller: '<%=controllerName%>',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();
