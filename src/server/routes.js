var router = require('express').Router();
var four0four = require('./utils/404')();
var data = require('./data');

router.get('/employeeLeaveApplication', function (req, res) {
  var filter = {};
  global.EmployeeLeaveApplication.get(filter).then(function (result) {
      res.status(200).send(result);
  }, function (err) {
      res.status(400).send(err);
  });
});


router.post('/employeeLeaveApplication', function (req, res) {
  var emp = new EmployeeLeaveApplication(req.body.document);
  emp.save().then(function(result) {
      res.send(result);
  }, function(error) {
      res.send(error);
  });
});

router.get('/designationleave', function (req, res) {
  var filter = {};
  global.DesignationLeave.get(filter).then(function (result) {
      res.status(200).send(result);
  }, function (err) {
      res.status(400).send(err);
  });
});

router.post('/designationleave', function (req, res) {
  var emp = new DesignationLeave(req.body.document);
  emp.save().then(function(result) {
      res.send(result);
  }, function(error) {
      res.send(error);
  });
});

router.get('/leavetype', function (req, res) {
  var filter = {};
  global.LeaveType.get(filter).then(function (result) {
      res.status(200).send(result);
  }, function (err) {
      res.status(400).send(err);
  });
});

router.post('/leavetype', function (req, res) {
  var emp = new LeaveType(req.body.document);
  emp.save().then(function(result) {
      res.send(result);
  }, function(error) {
      res.send(error);
  });
});

router.get('/leavebalance', function (req, res) {
  var filter = {};
  global.LeaveBalance.get(filter).then(function (result) {
      res.status(200).send(result);
  }, function (err) {
      res.status(400).send(err);
  });
});

router.post('/leavebalance', function (req, res) {
  var emp = new LeaveBalance(req.body.document);
  emp.save().then(function(result) {
      res.send(result);
  }, function(error) {
      res.send(error);
  });
});

router.get('/people', getPeople);
router.get('/person/:id', getPerson);
router.get('/*', four0four.notFoundMiddleware);

module.exports = router;

//////////////

function getPeople(req, res, next) {
  res.status(200).send(data.people);
}

function getPerson(req, res, next) {
  var id = +req.params.id;
  var person = data.people.filter(function(p) {
    return p.id === id;
  })[0];

  if (person) {
    res.status(200).send(person);
  } else {
    four0four.send404(req, res, 'person ' + id + ' not found');
  }
}
