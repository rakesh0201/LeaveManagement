module.exports = function() {
    //create method
    global.app.post("/leavetype", function (req, res) {
        var emp = new LeaveType(req.body.document);
        emp.save().then(function(result) {
            res.send(result);
        }, function(error) {
            res.send(error);
        });
    });

    //get method
    global.app.get("/leavetype", function (req, res) {
        var filter = {};
        global.LeaveType.get(filter).then(function (result) {
            res.status(200).send(result);
        }, function (err) {
            res.status(400).send(err);
        });
    });

    //get by id
    global.app.get("/leavetype/:id", function (req, res) {
        var filter = {id: req.params.id};
        global.LeaveType.get(filter).then(function (result) {
            res.status(200).send(result);
        }, function (err) {
            res.status(400).send(err);
        });
    });

    //get by filter
    global.app.post("/leavetype/get", function (req, res) {
        global.LeaveType.get(req.body.filter, req.body.join, req.body.sort, req.body.offset, req.body.limit).then(function (result) {
            res.status(200).send(result);
        }, function (err) {
            res.status(400).send(err);
        });
    });

    //update by filter
    global.app.post("/leavetype/update", function (req, res) {
        var emp = new LeaveType(req.body.document);
        emp.update(req.body.filter).then(function (result) {
            res.status(200).send(result);
        }, function (err) {
            res.status(400).send(err);
        });
    });

    //delete by filter
    global.app.post("/leavetype/delete", function (req, res) {
        global.LeaveType.delete(req.body.filter, req.body.join, req.body.sort, req.body.offset, req.body.limit).then(function (data) {
            res.status(200).send(data);
        }, function (err) {
            res.status(400).send(err);
        });
    });

    //delete by id   
    global.app.delete("/leavetype/:id", function (req, res) {
        global.LeaveType.delete(req.params.id).then(function (data) {
            res.status(200).send(data);
        }, function (err) {
            res.status(400).send(err);
        });
    });

    //update by id
    global.app.put("/leavetype/:id", function (req, res) {
        var emp = new LeaveType(req.body.document);
        var filter = {id: req.params.id};
        emp.update(filter).then(function (result) {
            res.status(200).send(result);
        }, function (err) {
            res.status(400).send(err);
        });
    });
};
