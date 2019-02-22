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
           state: 'leaveBalance',
           config: {
             url: '/leavebalance',
             templateUrl: ' app/dashboard/leaveBalance/leaveBalance.html',
             controller: 'balanceCtrl',
             controllerAs: 'vm',
             title: 'leaveBalance',
              
           }
        }
       
    ];  
}
})();
  