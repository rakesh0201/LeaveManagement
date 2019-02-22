(function() {
  'use strict';

  angular
    .module('app.dashboard')
    .controller('leaveApplicationController', leaveApplicationController);

  leaveApplicationController.$inject = ['$q', 'dataservice', 'logger','$http'];
  /* @ngInject */
  function leaveApplicationController($q, dataservice, logger,$http) {
    var vm = this;
   
    vm.leaveApplication={};
  // function to submit the form after all validation has occurred  
  $http({
    method : "GET",
      url : "api/employeeLeaveApplication"
  }).then(function mySuccess(response) {
    //$scope.myWelcome = response.data;
   // console.log(response);
    vm.leaveApplication=response;
    console.log(vm.leaveApplication);
  }, function myError(response) {
    $scope.myWelcome = response.statusText;
  });
  

  vm.submitForm = function(isValid) {

    // check to make sure the form is completely valid
    if (isValid) {
      alert('our form is amazing');
    }

  };

  vm.checkErr = function(startDate,endDate) {
    vm.errMessage = '';
    var curDate = new Date();

    if(new Date(startDate) > new Date(endDate)){
      vm.errMessage = 'End Date should be greater than start date';
      return false;
    }
    if(new Date(startDate) < curDate){
       vm.errMessage = 'Start date should not be before today.';
       return false;
    }
};

  
  //console.log(vm.leaveApplication);

   

   

    

    

  }
})();
