
(function() {
    'use strict';
  
    angular
      .module('app.dashboard')
      .controller('leaveTypeCtrl', leaveTypeCtrl);
  
    leaveTypeCtrl.$inject = ['$q', 'dataservice', 'logger'];
    /* @ngInject */
    function leaveTypeCtrl($q, dataservice, logger) {
      var vm = this;
     
      vm.newLeave={};
      vm.leaveType = [
        {
            name: 'Casual',
            type: 'paid',
            maxLeave : 40,
            designation: 'student',
            status: 'yes'
        },
        {
            name: 'sick',
            type: 'unpaid',
            maxLeave : 20,
            designation: 'professor',
            status: 'yes'
        },
        {
            name: 'maternity',
            type: 'paid',
            maxLeave : 30,
            designation: 'Dean',
            status: 'yes'
        },
        {
            name: 'paternity',
            type: 'paid',
            maxLeave : 30,
            designation: 'Librarian',
            status: 'no'
        },

        {
            name: 'study',
            type: 'unpaid',
            maxLeave : 30,
            designation: 'Supervisor',
            status: 'no'
        },
    ];

    
    console.log(vm.leaveType);
    
    vm.addLeave= function(){
        vm.leaveType.push(vm.newLeave);
        vm.newLeave={};
    };

    vm.selectLeave=function(user){
        vm.clickeduser=user;
    };
    vm.deleteLeave=function(){
        vm.leaveType.splice(vm.leaveType.indexOf(vm.clickeduser),1);

    } ;
     
  
     
  
      
  
      
  
    }
  })();
  

