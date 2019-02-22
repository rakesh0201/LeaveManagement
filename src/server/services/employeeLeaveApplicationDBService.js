function services(){
    var tableName = 'hr_emp_leave_application';
    var obj = {};

    obj.get = function(filter, join, sort, offset, limit) {
        var deferred = global.q.defer();
        var query = null;
        if (filter && Object.keys(filter).length > 0) {
            query = getQuery(filter, filter.history);
        }
        var selectionArray = getSelectionArray(join);
        var joinArray = getJoinArray(join);
        if (!sort) {
            sort = {hela_created_at: 0};
        }
        global.databaseService.select(tableName, selectionArray, query, joinArray, sort, offset, limit).then(function (res) {
            var response = {
                message: "data fetched successfully.",
                success: true,
                data: res,
                count: res.length
            };
            //log info
           // log.info('function: employeeLeaveApplicationDBService.get, info: ' );
            deferred.resolve(response);
        }, function (err) {
            var errorRes = {
                message: 'Error while fetching data',
                success: false,
                error: err
            };
            //log error
            log.error('function: employeeLeaveApplicationDBService.get, error: ' + err.toString());
            deferred.reject(errorRes);
        });

        return deferred.promise;
    };


    obj.insert = function(records) {
        var deferred = global.q.defer();
        
        if (records instanceof Array) {
            records = records.map(rec => {
                rec.hela_created_at  = global.moment.utc(new Date()).format(global.constants.SQLDATETIMEFORMAT);
                rec.hela_id = global.util.generateId();

                rec.hela_is_deleted = false;
                if (!rec.hela_emp_id) {
                    rec.hela_emp_id = rec.hela_updated_by;
                }
                if (rec.hela_leave_start) {
                    rec.hela_leave_start = global.moment.utc(rec.hela_leave_start).format(global.constants.SQLDATETIMEFORMAT); 
                }
    
                if (rec.hela_leave_end) {
                    rec.hela_leave_end = global.moment.utc(rec.hela_leave_end).format(global.constants.SQLDATETIMEFORMAT); 
                }
                return rec;
            });
        } else {
           // records.hela_created_at  = global.moment.utc(new Date()).format(global.constants.SQLDATETIMEFORMAT); 
           // records.hela_id = global.cdutil.generateId(); 
          records.hela_is_deleted = false;
            /**  if (records.hela_leave_start) {
                records.hela_leave_start = global.moment.utc(records.hela_leave_start).format(global.constants.SQLDATETIMEFORMAT); 
            }

            if (records.hela_leave_end) {
                records.hela_leave_end = global.moment.utc(records.hela_leave_end).format(global.constants.SQLDATETIMEFORMAT); 
            } */
        }
        global.databaseService.insert(tableName, records).then(function (res) {
            var response = {
                success: true,
                message: 'data Created Successfully.',
            };
            response.data = res;
          //  log.info('function: employeeLeaveApplicationDBService.get, info: ' + res.toString());
            deferred.resolve(response);
        }, function (err) {
            deferred.reject({
                success: false,
                message: 'Error While Creating helaloyee',
                error: err
            });
        });
       // log.error('function: employeeLeaveApplicationDBService.get, error: ' + err.toString());
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
                rec.hela_updated_at  = global.moment.utc(new Date()).format(global.constants.SQLDATETIMEFORMAT);
                rec.hela_updated_by = updatedBy;
                return rec;
            });
        } else {
            records.hela_updated_at  = global.moment.utc(new Date()).format(global.constants.SQLDATETIMEFORMAT); 
            records.hela_updated_by = updatedBy;
        }
        global.databaseService.update(tableName, records, query).then(function (res) {
            var response = {
                success: true,
                message: 'data Updated Successfully.',
            };
            response.data = res;
            log.info('function: employeeLeaveApplicationDBService.get, info: ' + res.toString());
            deferred.resolve(response);
        }, function (err) {
            deferred.reject({
                success: false,
                message: 'Error While Updating helaloyee',
                error: err
            });
        });
        log.error('function: employeeLeaveApplicationDBService.get, error: ' + err.toString());
        return deferred.promise;
    };

    return obj;
 }

 // ----------------------------------- HELPER FUNCTIONS ------------------------------------ //
 /**
  * @author Ranjeet
  * @description This funciton generates query as per the data access layer format
  * @param {array} Takes array of object [{property:'', operator:'', value:''}]
  * @return {Object}
  */

  function buildQuery(filters) {
    var query = {
        $equalTo: {},
        $in: {},
        $gte: {},
        $lte: {}
    };

    return query;
  }

/**
 * @author Neeraj
 * @description This function generates a KNEX query object based on the filters provided for wf_draft table
 * @param {Object} filter Object containing props on which to filter
 * @param {boolean} skipDates used when user wants to fetch all the records irrespective of the dates in efft_to and efft_from fields. OR in update
 * @returns {Object} Knex query object
 */
function getQuery(filter, skipDates) {
    //build query according to parameters which has recived in paylaod
    var query = {
        $equalTo: {},
        $in: {},
        $gte: {},
        $lte: {}
    };
    var currentDate = global.moment.utc(new Date()).format(global.constants.SQLDATETIMEFORMAT);
    // id
    if (filter.id) {
        if (filter.id instanceof Array) {
            query.$in = {
                column: 'hela_id',
                value: filter.id
            };
        } else {
            query.$equalTo.hela_id = filter.id;
        }
    }

    if (filter.leaveStart) {
        if (filter.leaveStart instanceof Array) {
            query.$in = {
                column: 'hela_leave_start',
                value: filter.leaveStart
            };
        } else {
            query.$equalTo.hela_leave_start = filter.leaveStart;
        }
    }


    if (filter.leaveEnd) {
        if (filter.leaveEnd instanceof Array) {
            query.$in = {
                column: 'hela_leave_end',
                value: filter.leaveEnd
            };
        } else {
            query.$equalTo.hela_leave_end = filter.leaveEnd;
        }
    }

    /*if (filter.joiningDateRange) {
        if (joiningDateRange.start) {
            query.$gte.hela_dob = joiningDateRange.start;
        }
        if (joiningDateRange.end) {
            query.$lte.hela_dob = joiningDateRange.end;
        }
    }*/

    if (filter.leaveType) {
        if (filter.leaveType instanceof Array) {
            query.$in = {
                column: 'hela_leave_type',
                value: filter.leaveType
            };
        } else {
            query.$equalTo.hela_leave_type = filter.leaveType;
        }
    }


    if (filter.name) {
        if (filter.name instanceof Array) {
            query.$in = {
                column: 'hela_emp_name',
                value: filter.name
            };
        } else {
            query.$equalTo.hela_emp_name = filter.name;
        }
    }


    if (filter.mobileNo) {
        if (filter.mobileNo instanceof Array) {
            query.$in = {
                column: 'hela_mobile_no',
                value: filter.mobileNo
            };
        } else {
            query.$equalTo.hela_mobile_no = filter.mobileNo;
        }
    }


    if (filter.deptName) {
        if (filter.deptName instanceof Array) {
            query.$in = {
                column: 'hela_dept_name',
                value: filter.deptName
            };
        } else {
            query.$equalTo.hela_dept_name = filter.deptName;
        }
    }

    if (filter.isDeleted) {
        query.$equalTo.hela_is_deleted = true;
    }else {
        query.$equalTo.hela_is_deleted = false;
    }
    
    //Remove empty objects from query
    var queryKeys = Object.keys(query);
    queryKeys.forEach(function (key) {
        if (Object.keys(query[key]).length === 0) {
            delete query[key];
        }
    });
    return query;
}

/**
 * @author Neeraj
 * @description Generates a KNEX join array based on parameters provided.
 * @param {Object} join An object containing Class names as properties on which tables to join. {parent: <boolean>}
 * @returns {Array}
 */

function getJoinArray(join) {
    if (!join) {
        return null;
    }
     let arr = [];
    if (join.leaveBalance) {
     	let obj = {
            tableName: 'hr_emp_leave_balance',
            cName1: 'hr_emp_leave_application.hela_emp_id',
            cName2: 'hr_emp_leave_balance.helb_emp_id',
            type: 'left'
        };
        arr.push(obj);
    }

        if (join.leaveType) {
            let obj = {
                tableName: 'hr_leave_type',
                cName1: 'hr_emp_leave_application.hela_emp_id',
                cName2: 'hr_leave_type.hlt_emp_id',
                type: 'left'
            };
            arr.push(obj);
        }
    
    
    return arr;
}

/**
 * @author Neeraj
 * @description Generates a selection array based on parameter provided.
 * @param {Object} join An object containing Class names as properties on which tables to join. {parent: <boolean>}
 * @returns {Array}
 */
function getSelectionArray(join) {
    if (!join) {
        return null;
    }
	
    let arr = [];    
    arr.push('hela_id');
    arr.push('hela_emp_id');
    arr.push('hela_emp_name');
    arr.push('hela_designation_id');   
    arr.push('hela_dept_name');
    

    

    if (join.leaveBalance) {
        arr.push('helb_leave_days');
        arr.push('helb_leave_type');
    }

    if (join.leaveType) {
        arr.push('hlt_type');
        arr.push('hlt_type_id');
    }

    

   

    return arr;
}

module.exports = services;
