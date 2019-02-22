/*var leave = angular.module('myApp', []);
leave.controller('mainCtrl', function(vm) {
     
    
    vm.leaveemployeeID = [
        {
            name: 'Atul Nagi',
            employeeID: 123,
            departName : "SCIS",
            designation: 'student',
            DOB: '12- 02- 1965'
        },
        {
            name: 'Rajeev',
            employeeID: 231,
            departName : "Maths",
            designation: 'professor',
            DOB: '21-03-1964'
        },
        {
            name: 'Arun Agrwal',
            employeeID: 111,
            departName : "SCIS",
            designation: 'Dean',
            DOB: '12-09-1947'
        },
        {
            name: 'RAhul',
            employeeID: 211,
            departName : "Social Science",
            designation: 'Prof.',
            DOB: '23-04-1965'
        },

        {
            name: 'Divya',
            employeeID: 112,
            departName : "SCS",
            designation: 'Student',
           DOB: '20-01-1994'
        },
    ];

    vm.name= 'Atul nagi';
    vm.designation ='Professor';
    vm.employeeId =121;
    vm.dob="12-05-1965";
    vm.departmentName="SCIS";
    vm.doj="12-05-1994";


    console.log(vm.leaveemployeeID);
    
   
        
});
*/

(function() {
    'use strict';
  
    angular
      .module('app.dashboard')
      .controller('infoCtrl', infoCtrl);
  
    infoCtrl.$inject = ['$q', 'dataservice', 'logger'];
    /* @ngInject */
    function infoCtrl($q, dataservice, logger) {
      var vm = this;

      vm.name= 'Atul nagi';
      vm.designation ='Professor';
      vm.employeeId =121;
      vm.dob="12-05-1965";
      vm.departmentName="SCIS";
      vm.doj="12-05-1994";
  
    }
})();