
(function() {
    'use strict';
  
    angular
      .module('app.dashboard')
      .controller('historyCtrl', historyCtrl);
  
    historyCtrl.$inject = ['$q', 'dataservice', 'logger'];
    /* @ngInject */
    function historyCtrl($q, dataservice, logger) {
      var vm = this;
     
      vm.leaveHistory = [
        {
            name: 'Casual',
            startDate: '12-02-2019',
            endDate: '12-03-2019' ,
            leaveDays: 30,
            status: 'yes'
        },
        {
            name: 'sick',
            startDate: '12-03-2019',
            endDate: '12-04-2019',
            leaveDays: 30,
            status: 'yes'
        },
        {
            name: 'maternity',
            startDate: '12-04-2019' ,
            endDate: '12-05-2019' ,
            leaveDays: 30,
            status: 'yes'
        },
        {
            name: 'paternity',
            startDate: '12-08-2019' ,
            endDate: '12-09-2019',
            leaveDays: 30,
            status: 'no'
        },

        {
            name: 'study',
            startDate: '12-10-2019' ,
            endDate: '12-11-2019',
            leaveDays: 30,
            status: 'no'
        },
    ];
    }
  })();

