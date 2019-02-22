

(function() {
    'use strict';
  
    angular
      .module('app.dashboard')
      .controller('balanceCtrl', balanceCtrl);
  
    balanceCtrl.$inject = ['$q', 'dataservice', 'logger'];
    /* @ngInject */
    function balanceCtrl($q, dataservice, logger) {
      var vm = this;
     
      vm.leaveBalance = [
        {
            name: 'Casual',
            type: 'paid',
            maxLeave : 40,
            availableLeave: 12,
            status: 'yes'
        },
        {
            name: 'sick',
            type: 'unpaid',
            maxLeave : 20,
            availableLeave: 10,
            status: 'yes'
        },
        {
            name: 'maternity',
            type: 'paid',
            maxLeave : 30,
            availableLeave: 5,
            status: 'yes'
        },
        {
            name: 'paternity',
            type: 'paid',
            maxLeave : 30,
            availableLeave: 5,
            status: 'no'
        },

        {
            name: 'study',
            type: 'unpaid',
            maxLeave : 30,
            availableLeave: 5,
            status: 'no'
        },
    ];
      
  
    }
  })();
  

