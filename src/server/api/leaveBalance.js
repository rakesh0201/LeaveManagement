module.exports = function() {
    //create method
    global.app.post("/leavebalance", function (req, res) {
        var emp = new LeaveBalance(req.body.document);
        emp.save().then(function(result) {
            res.send(result);
        }, function(error) {
            res.send(error);
        });
    });

    //get method
    global.app.get("/leavebalance", function (req, res) {
        var filter = {};
        global.LeaveBalance.get(filter).then(function (result) {
            res.status(200).send(result);
        }, function (err) {
            res.status(400).send(err);
        });
    });

    //get by id
    global.app.get("/leavebalance/:id", function (req, res) {
        var filter = {id: req.params.id};
        global.LeaveBalance.get(filter).then(function (result) {
            res.status(200).send(result);
        }, function (err) {
            res.status(400).send(err);
        });
    });

    //get by filter
    global.app.post("/leavebalance/get", function (req, res) {
        global.LeaveBalance.get(req.body.filter, req.body.join, req.body.sort, req.body.offset, req.body.limit).then(function (result) {
            res.status(200).send(result);
        }, function (err) {
            res.status(400).send(err);
        });
    });

    //update by filter
    global.app.post("/leavebalance/update", function (req, res) {
        var emp = new LeaveBalance(req.body.document);
        emp.update(req.body.filter).then(function (result) {
            res.status(200).send(result);
        }, function (err) {
            res.status(400).send(err);
        });
    });

    //delete by filter
    global.app.post("/leavebalance/delete", function (req, res) {
        global.LeaveBalance.delete(req.body.filter, req.body.join, req.body.sort, req.body.offset, req.body.limit).then(function (data) {
            res.status(200).send(data);
        }, function (err) {
            res.status(400).send(err);
        });
    });

    //delete by id   
    global.app.delete("/leavebalance/:id", function (req, res) {
        global.LeaveBalance.delete(req.params.id).then(function (data) {
            res.status(200).send(data);
        }, function (err) {
            res.status(400).send(err);
        });
    });

    //update by id
    global.app.put("/leavebalance/:id", function (req, res) {
        var emp = new LeaveBalance(req.body.document);
        var filter = {id: req.params.id};
        emp.update(filter).then(function (result) {
            res.status(200).send(result);
        }, function (err) {
            res.status(400).send(err);
        });
    });
};
