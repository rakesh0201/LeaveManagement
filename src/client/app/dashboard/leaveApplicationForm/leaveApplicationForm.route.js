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
        state: 'leaveapplication',
        config: {
          url: '/leaveapplication',
          templateUrl: 'app/dashboard/leaveApplicationForm/leaveApplicationForm.html',
          controller: 'leaveApplicationController',
          controllerAs: 'vm',
          title: 'leaveapplication',
         
        }
      }
    ];
  }
})();
