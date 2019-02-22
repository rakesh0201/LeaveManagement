function services(){
    var tableName = 'hr_designation_leave';
    var obj = {};

    obj.get = function(filter, join, sort, offset, limit) {
        var deferred = global.q.defer();
        var query = null;
        if (filter && Object.keys(filter).length > 0) {
            query = getQuery(filter, filter.history);
        }
        query = getQuery(filter, filter.history);
       // var selectionArray = getSelectionArray(join);
        //var joinArray = getJoinArray(join);
        if (!sort) {
            sort = {hdl_created_at: 0};
        }
        global.databaseService.select(tableName, null, query, null, sort, offset, limit).then(function (res) {
            var response = {
                message: "data fetched successfully.",
                success: true,
                data: res,
                count: res.length
            };
            //log info
           // log.info('function: designationLeaveDBService.get, info: ' );
            deferred.resolve(response);
        }, function (err) {
            var errorRes = {
                message: 'Error while fetching data',
                success: false,
                error: err
            };
            //log error
            log.error('function: designationLeaveDBService.get, error: ' + err.toString());
            deferred.reject(errorRes);
        });

        return deferred.promise;
    };


    obj.insert = function(records) {
        var deferred = global.q.defer();
        
        if (records instanceof Array) {
            records = records.map(rec => {
                rec.hdl_created_at  = global.moment.utc(new Date()).format(global.constants.SQLDATETIMEFORMAT);
                rec.hdl_id = global.util.generateId();

                rec.hdl_is_deleted = false;
              /*   if (!rec.hdl_emp_id) {
                    rec.hdl_emp_id = rec.hdl_updated_by;
                }
                if (rec.hdl_leave_start) {
                    rec.hdl_leave_start = global.moment.utc(rec.hdl_leave_start).format(global.constants.SQLDATETIMEFORMAT); 
                }
    
                if (rec.hdl_leave_end) {
                    rec.hdl_leave_end = global.moment.utc(rec.hdl_leave_end).format(global.constants.SQLDATETIMEFORMAT); 
                }*/
                return rec;
            });
        } else {
           // records.hdl_created_at  = global.moment.utc(new Date()).format(global.constants.SQLDATETIMEFORMAT); 
           // records.hdl_id = global.cdutil.generateId(); 
          records.hdl_is_deleted = false;
            /**  if (records.hdl_leave_start) {
                records.hdl_leave_start = global.moment.utc(records.hdl_leave_start).format(global.constants.SQLDATETIMEFORMAT); 
            }

            if (records.hdl_leave_end) {
                records.hdl_leave_end = global.moment.utc(records.hdl_leave_end).format(global.constants.SQLDATETIMEFORMAT); 
            } */
        }
        global.databaseService.insert(tableName, records).then(function (res) {
            var response = {
                success: true,
                message: 'data Created Successfully.',
            };
            response.data = res;
          //  log.info('function: designationLeaveDBService.get, info: ' + res.toString());
            deferred.resolve(response);
        }, function (err) {
            deferred.reject({
                success: false,
                message: 'Error While Creating leave',
                error: err
            });
        });
       // log.error('function: designationLeaveDBService.get, error: ' + err.toString());
        return deferred.promise;
    };

    obj.update = function(records, filter, updatedBy) {
        var deferred = global.q.defer();
        var query = null;
        if (filter && Object.keys(filter).length > 0) {
            query = getQuery(filter);
        }
        if (records instanceof Array) {
            records = records.map(rec => {
                rec.hdl_updated_at  = global.moment.utc(new Date()).format(global.constants.SQLDATETIMEFORMAT);
                rec.hdl_updated_by = updatedBy;
                return rec;
            });
        } else {
            records.hdl_updated_at  = global.moment.utc(new Date()).format(global.constants.SQLDATETIMEFORMAT); 
            records.hdl_updated_by = updatedBy;
        }
        global.databaseService.update(tableName, records, query).then(function (res) {
            var response = {
                success: true,
                message: 'data Updated Successfully.',
            };
            response.data = res;
            log.info('function: designationLeaveDBService.get, info: ' + res.toString());
            deferred.resolve(response);
        }, function (err) {
            deferred.reject({
                success: false,
                message: 'Error While Updating hdlloyee',
                error: err
            });
        });
        //log.error('function: designationLeaveDBService.get, error: ' + err.toString());
        return deferred.promise;
    };

    return obj;
 }


 function buildQuery(filters) {
    var query = {
        $equalTo: {},
        $in: {},
        $gte: {},
        $lte: {}
    };

    return query;
  }



function getQuery(filter, skipDates) {
    //build query according to parameters which has recived in payload
    var query = {
        $equalTo: {},
        $in: {},
        $gte: {},
        $lte: {}
    };
   // var currentDate = global.moment.utc(new Date()).format(global.constants.SQLDATETIMEFORMAT);
    // id
    if (filter.id) {
        if (filter.id instanceof Array) {
            query.$in = {
                column: 'hdl_id',
                value: filter.id
            };
        } else {
            query.$equalTo.hdl_id = filter.id;
        }
    }

    /*if (filter.joiningDateRange) {
        if (joiningDateRange.start) {
            query.$gte.hdl_dob = joiningDateRange.start;
        }
        if (joiningDateRange.end) {
            query.$lte.hdl_dob = joiningDateRange.end;
        }
    }*/

    if (filter.leaveType) {
        if (filter.leaveType instanceof Array) {
            query.$in = {
                column: 'hdl_leave_type',
                value: filter.leaveType
            };
        } else {
            query.$equalTo.hdl_leave_type = filter.leaveType;
        }
    }

    /**if (filter.isDeleted) {
        query.$equalTo.hdl_is_deleted = true;
    }else {
        query.$equalTo.hdl_is_deleted = false;
    } */
    
    //Remove empty objects from query
    var queryKeys = Object.keys(query);
    queryKeys.forEach(function (key) {
        if (Object.keys(query[key]).length === 0) {
            delete query[key];
        }
    });
    return query;
}


module.exports = services;