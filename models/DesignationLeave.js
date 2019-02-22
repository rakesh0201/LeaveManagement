class DesignationLeave{
    constructor(obj){
        this.document = {
            _type: 'DesignationLeave'
        };
        if(obj){
            this.id = obj.hdl_id;
            this.designationId = obj.hdl_designation_id;
            this.leaveType = obj.hdl_leave_type;
            this.leaveDays = obj.hdl_leave_days;
            this.createdBy = obj.hdl_created_by;
            this.createdAt = obj.hdl_created_at;
            this.updatedBy = obj.hdl_updated_by;
            this.updatedAt = obj.hdl_updated_at;
            this.isDeleted = obj.hdl_is_deleted;
        }
    }

    set id(value){
        this.document.hdl_id = value;
    }
    get id()
    {
        return this.document.hdl_id;
    }

    set designationId(value){
        this.document.hdl_designation_id = value;
    }
    get designationId()
    {
        return this.document.hdl_designation_id;
    }

    set leaveType(value){
        this.document.hdl_leave_type = value;
    }
    get leaveType()
    {
        return this.document.hdl_leave_type;
    }

    set leaveDays(value){
        this.document.hdl_leave_days = value;
    }
    get leaveDays()
    {
        return this.document.hdl_leave_days;
    }

    set createdAt(value) {
        this.document.hdl_created_at = value;
    }
    get createdAt() {
        return this.document.hdl_created_at;
    }

    set createdBy(value) {
        this.document.hdl_created_by = value;
    }
    get createdBy() {
        return this.document.hdl_created_by;
    }

    set updatedBy(value) {
        this.document.hdl_updated_by = value;
    }
    get updatedBy() {
        return this.document.hdl_updated_by;
    }

    set updatedAt(value) {
        this.document.hdl_updated_at = value;
    }
    get updatedAt() {
        return this.document.hdl_updated_at;
    }

    set isDeleted(value) {
        this.document.hdl_is_deleted = value;
    }
    get isDeleted() {
        return this.document.hdl_is_deleted;
    }


    static get(filter, join, sort, offset, limit) {
        var promise = new Promise((resolve, reject) => {
            //Fetch from DB
            global.designationLeaveDBService.get(filter, join, sort, offset, limit).then(
                (res) => {
                    resolve(res);
         sd       },
                (err) => {
                    reject(err);
                }
            );
        });
        return promise;
    }    

    save() {
        let record = this.document;
        delete record._type;
        var promise = new Promise((resolve, reject) => {
            //Insert into DB
            global.designationLeaveDBService.insert(record).then((res) => {
                resolve(res);
            }, (err) => {
                reject(err);
            });
        });
        return promise;
    }

    update(filter, updatedBy) {
        let record = this.document;
        delete record._type;
        var dataToBeUpdt = _getDataToBeUpdt(record);
        var promise = new Promise((resolve, reject) => {
            //Fetch from DB
            global.designationLeaveDBService.update(dataToBeUpdt, filter).then(
                (res) => {
                    resolve(res);
                },
                (err) => {
                    reject(err);
                }
            );
        });
        return promise;
    }

    static delete(empId, updatedBy) {
        var promise = new Promise((resolve, reject) => {
            var dataToBeUpdt = {
                emp_is_deleted: true
            };
            var filter = {
                id: empId
            };
            //Update DB
            global.designationLeaveDBService.update(dataToBeUpdt, filter, updatedBy).then(
                (res) => {
                    resolve(res);
                },
                (err) => {
                    err.message = 'Error in deleting employee.';
                    reject(err);
                }
            );
        });
        return promise;
    }
}

module.exports = designationLeave;  

function _getDataToBeUpdt(obj) {
    for (var propName in obj) {
        if (obj[propName] === null || obj[propName] === undefined) {
          delete obj[propName];
        }
    }
    delete obj.emp_created_by;
    delete obj.emp_created_at;
    return obj;
}


