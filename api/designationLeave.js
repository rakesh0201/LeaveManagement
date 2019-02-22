module.exports = function() {
    //create method
    global.app.post("/designationleave", function (req, res) {
        var emp = new designationLeave(req.body.document);
        emp.save().then(function(result) {
            res.send(result);
        }, function(error) {
            res.send(error);
        });
    });

    //get method
    global.app.get("/designationleave", function (req, res) {
        var filter = {};
        global.designationLeave.get(filter).then(function (result) {
            res.status(200).send(result);
        }, function (err) {
            res.status(400).send(err);
        });
    });

    //get by id
    global.app.get("/designationleave/:id", function (req, res) {
        var filter = {id: req.params.id};
        global.designationLeave.get(filter).then(function (result) {
            res.status(200).send(result);
        }, function (err) {
            res.status(400).send(err);
        });
    });

    //get by filter
    global.app.post("/designationleave/get", function (req, res) {
        global.designationLeave.get(req.body.filter, req.body.join, req.body.sort, req.body.offset, req.body.limit).then(function (result) {
            res.status(200).send(result);
        }, function (err) {
            res.status(400).send(err);
        });
    });

    //update by filter
    global.app.post("/designationleave/update", function (req, res) {
        var emp = new designationLeave(req.body.document);
        emp.update(req.body.filter).then(function (result) {
            res.status(200).send(result);
        }, function (err) {
            res.status(400).send(err);
        });
    });

    //delete by filter
    global.app.post("/designationleave/delete", function (req, res) {
        global.designationLeave.delete(req.body.filter, req.body.join, req.body.sort, req.body.offset, req.body.limit).then(function (data) {
            res.status(200).send(data);
        }, function (err) {
            res.status(400).send(err);
        });
    });

    //delete by id   
    global.app.delete("/designationleave/:id", function (req, res) {
        global.designationLeave.delete(req.params.id).then(function (data) {
            res.status(200).send(data);
        }, function (err) {
            res.status(400).send(err);
        });
    });

    //update by id
    global.app.put("/designationleave/:id", function (req, res) {
        var emp = new designationLeave(req.body.document);
        var filter = {id: req.params.id};
        emp.update(filter).then(function (result) {
            res.status(200).send(result);
        }, function (err) {
            res.status(400).send(err);
        });
    });
};
