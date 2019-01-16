class LeaveType{
    constructor(obj){
        this.document = {
            _type = 'Leavetype'
        };
        if(obj){
            this.id = obj.hlt_id;
            this.type = obj.hlt_type;
            this.designationId = obj.hlt.designation_id;
            this.createdBy = obj.hlt_created_by;
            this.createdAt = obj.hlt_created_at;
            this.updatedBy = obj.hlt_updated_by;
            this.updatedAt = obj.hlt_updated_at;
            this.isDeleted = obj.hlt_is_deleted;
        }
    }



    set id(value){
        this.document.hlt_id = value;
    }
    get id()
    {
        return this.document.hlt_id;
    }

    set type(value){
        this.document.hlt_type = value;
    }
    get type()
    {
        return this.document.hlt_type;
    }

    set designationId(value){
        this.document.hlt_designation_id = value;
    }
    get designationId()
    {
        return this.document.hlt_designation_id;
    }

    set createdAt(value) {
        this.document.hlt_created_at = value;
    }
    get createdAt() {
        return this.document.hlt_created_at;
    }

    set createdBy(value) {
        this.document.hlt_created_by = value;
    }
    get createdBy() {
        return this.document.hlt_created_by;
    }

    set updatedBy(value) {
        this.document.hlt_updated_by = value;
    }
    get updatedBy() {
        return this.document.hlt_updated_by;
    }

    set updatedAt(value) {
        this.document.hlt_updated_at = value;
    }
    get updatedAt() {
        return this.document.hlt_updated_at;
    }

    set isDeleted(value) {
        this.document.hlt_is_deleted = value;
    }
    get isDeleted() {
        return this.document.hlt_is_deleted;
    }

    static get(filter, join, sort, offset, limit) {
        var promise = new Promise((resolve, reject) => {
            //Fetch from DB
            global.leaveTypeDBService.get(filter, join, sort, offset, limit).then(
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
            global.leaveTypeDBService.insert(record).then((res) => {
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
            global.leaveTypeDBService.update(dataToBeUpdt, filter).then(
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
            global.leaveTypeDBService.update(dataToBeUpdt, filter, updatedBy).then(
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

module.exports = leaveType;  

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