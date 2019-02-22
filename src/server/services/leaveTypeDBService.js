function services(){
    var tableName = 'hr_leave_type';
    var obj = {};

    obj.get = function(filter, join, sort, offset, limit) {
        var deferred = global.q.defer();
        var query = null;
        if (filter && Object.keys(filter).length > 0) {
            query = getQuery(filter, filter.history);
        }
        //var selectionArray = getSelectionArray(join);
        //var joinArray = getJoinArray(join);
        if (!sort) {
            sort = {hlt_created_at: 0};
        }
        global.databaseService.select(tableName, null, query,null, sort, offset, limit).then(function (res) {
            var response = {
                message: "data fetched successfully.",
                success: true,
                data: res,
                count: res.length
            };
            //log info
           // log.info('function: leaveTypeDBService.get, info: ' );
            deferred.resolve(response);
        }, function (err) {
            var errorRes = {
                message: 'Error while fetching data',
                success: false,
                error: err
            };
            //log error
            log.error('function: leaveTypeDBService.get, error: ' + err.toString());
            deferred.reject(errorRes);
        });

        return deferred.promise;
    };


    obj.insert = function(records) {
        var deferred = global.q.defer();
        
        if (records instanceof Array) {
            records = records.map(rec => {
                rec.hlt_created_at  = global.moment.utc(new Date()).format(global.constants.SQLDATETIMEFORMAT);
                rec.hlt_id = global.util.generateId();

                rec.hlt_is_deleted = false;
              /*   if (!rec.hlt_emp_id) {
                    rec.hlt_emp_id = rec.hlt_updated_by;
                }
                if (rec.hlt_leave_start) {
                    rec.hlt_leave_start = global.moment.utc(rec.hlt_leave_start).format(global.constants.SQLDATETIMEFORMAT); 
                }
    
                if (rec.hlt_leave_end) {
                    rec.hlt_leave_end = global.moment.utc(rec.hlt_leave_end).format(global.constants.SQLDATETIMEFORMAT); 
                }*/
                return rec;
            });
        } else {
           // records.hlt_created_at  = global.moment.utc(new Date()).format(global.constants.SQLDATETIMEFORMAT); 
           // records.hlt_id = global.cdutil.generateId(); 
          records.hlt_is_deleted = false;
            /**  if (records.hlt_leave_start) {
                records.hlt_leave_start = global.moment.utc(records.hlt_leave_start).format(global.constants.SQLDATETIMEFORMAT); 
            }

            if (records.hlt_leave_end) {
                records.hlt_leave_end = global.moment.utc(records.hlt_leave_end).format(global.constants.SQLDATETIMEFORMAT); 
            } */
        }
        global.databaseService.insert(tableName, records).then(function (res) {
            var response = {
                success: true,
                message: 'data Created Successfully.',
            };
            response.data = res;
          //  log.info('function: leaveTypeDBService.get, info: ' + res.toString());
            deferred.resolve(response);
        }, function (err) {
            deferred.reject({
                success: false,
                message: 'Error While Creating',
                error: err
            });
        });
       // log.error('function: leaveTypeDBService.get, error: ' + err.toString());
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
                rec.hlt_updated_at  = global.moment.utc(new Date()).format(global.constants.SQLDATETIMEFORMAT);
                rec.hlt_updated_by = updatedBy;
                return rec;
            });
        } else {
            records.hlt_updated_at  = global.moment.utc(new Date()).format(global.constants.SQLDATETIMEFORMAT); 
            records.hlt_updated_by = updatedBy;
        }
        global.databaseService.update(tableName, records, query).then(function (res) {
            var response = {
                success: true,
                message: 'data Updated Successfully.',
            };
            response.data = res;
            log.info('function: leaveTypeDBService.get, info: ' + res.toString());
            deferred.resolve(response);
        }, function (err) {
            deferred.reject({
                success: false,
                message: 'Error While Updating hltloyee',
                error: err
            });
        });
        log.error('function: leaveTypeDBService.get, error: ' + err.toString());
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
                column: 'hlt_id',
                value: filter.id
            };
        } else {
            query.$equalTo.hlt_id = filter.id;
        }
    }

    if (filter.type) {
        if (filter.type instanceof Array) {
            query.$in = {
                column: 'hlt_type',
                value: filter.type
            };
        } else {
            query.$equalTo.hlt_type = filter.type;
        }
    }

    if (filter.leaveName) {
        if (filter.leaveName instanceof Array) {
            query.$in = {
                column: 'hlt_leave_name',
                value: filter.leaveName
            };
        } else {
            query.$equalTo.hlt_leave_name= filter.leaveName;
        }
    }

    /**if (filter.isDeleted) {
        query.$equalTo.hlt_is_deleted = true;
    }else {
        query.$equalTo.hlt_is_deleted = false;
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