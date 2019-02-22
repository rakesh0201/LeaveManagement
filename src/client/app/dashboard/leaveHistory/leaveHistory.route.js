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
           state: 'leavehistory',
           config: {
             url: '/leavehistory',
             templateUrl: ' app/dashboard/leaveHistory/leaveHistory.html',
             controller: 'historyCtrl',
             controllerAs: 'vm',
             title: 'leavehistory',
              
           }
        }
       
    ];  
}
})();
  