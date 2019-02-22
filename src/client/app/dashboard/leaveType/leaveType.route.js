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
           state: 'leavetype',
           config: {
             url: '/leavetype',
             templateUrl: 'app/dashboard/leaveType/leaveType.html',
             controller: 'leaveTypeCtrl',
             controllerAs: 'vm',
             title: 'leavetype',
              
           }
        }
       
    ];  
}
})();
  