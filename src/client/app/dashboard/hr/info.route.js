(function() {
    'use strict';
  
    angular
      .module('app.dashboard')
      .run(appRun);
  
    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
      routerHelper.configureStates(getStates());
    }
  
    function getStates() {
      return [
        {
          state: 'leavedashboard',
          config: {
            url: '/dashboard',
            templateUrl: '/app/dashboard/hr/info.html',
            controller: 'infoCtrl',
            controllerAs: 'vm',
            title: 'leaveDashboard',
           
          }
        }
      ];
    }
  })();
  