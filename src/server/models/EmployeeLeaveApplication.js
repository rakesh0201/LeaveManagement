class EmployeeLeaveApplication{
    constructor(obj){
        this.document = {
                _type: 'EmployeeLeaveApplication'
        };
        if(obj){
            this.id = obj.hela_id;
            this.empId = obj.hela_emp_id;
            this.name = obj.hela_emp_name;
            this.leaveStart = obj.hela_leave_start;
            this.leaveEnd = obj.hela_leave_end;
            this.emailId = obj.hela_email_id;
            this.designationId = obj.hela_designation_id;
            this.leaveType = obj.hela_leave_type;
            this.leaveInfo = obj.hela_leave_info;
            this.status = obj.hela_status;
            this.leaveDays = obj.hela_leave_days;
            this.createdBy = obj.hela_created_by;
            this.createdAt = obj.hela_created_at;
            this.updatedBy = obj.hela_updated_by;
            this.updatedAt = obj.hela_updated_at;
            this.isDeleted = obj.hela_is_deleted;
            this.deptName = obj.hela_dept_name;
            this.gender = obj.hela_sex;
            this.mobileNo = obj.hela_mobile_no;
            this.location = obj.hela_location;
        }
    }
    set id(value){
        this.document.hela_id = value;
    }
    get id()
    {
        return this.document.hela_id;
    }

    set designationId(value){
        this.document.hela_designation_id = value;
    }
    get designationId()
    {
        return this.document.hela_designation_id;
    }

    set empId(value){
        this.document.hela_emp_id = value;
    }
    get empId()
    {
        return this.document.hela_emp_id;
    }
    set emailId(value){
        this.document.hela_email_id = value;
    }
    get emailId()
    {
        return this.document.hela_email_id;
    }

    set leaveType(value){
        this.document.hela_leave_type = value;
    }
    get leaveType()
    {
        return this.document.hela_leave_type;
    }

    set leaveDays(value){
        this.document.hela_leave_days = value;
    }
    get leaveDays()
    {
        return this.document.hela_leave_days;
    }

    set name(value){
        this.document.hela_emp_name = value;
    }
    get name()
    {
        return this.document.hela_emp_name;
    }

    set deptName(value){
        this.document.hela_dept_name = value;
    }
    get deptName()
    {
        return this.document.hela_dept_name;
    }

    set leaveStart(value){
        this.document.hela_leave_start = value;
    }
    get leaveStart()
    {
        return this.document.hela_leave_start;
    }

    set leaveEnd(value){
        this.document.hela_leave_end = value;
    }
    get leaveEnd()
    {
        return this.document.hela_leave_end;
    }

    set sex(value){
        this.document.hela_sex = value;
    }
    get sex()
    {
        return this.document.hela_sex;
    }

    set mobileNo(value){
        this.document.hela_mobile_no = value;
    }
    get mobileNo()
    {
        return this.document.hela_mobile_no;
    }

    set location(value){
        this.document.hela_location = value;
    }
    get location()
    {
        return this.document.hela_location;
    }

    set leaveInfo(value){
        this.document.hela_leave_info = value;
    }
    get leaveInfo()
    {
        return this.document.hela_leave_info;
    }

    set status(value){
        this.document.hela_status = value;
    }
    get status()
    {
        return this.document.hela_status;
    }

    set createdAt(value) {
        this.document.hela_created_at = value;
    }
    get createdAt() {
        return this.document.hela_created_at;
    }

    set createdBy(value) {
        this.document.hela_created_by = value;
    }
    get createdBy() {
        return this.document.hela_created_by;
    }

    set updatedBy(value) {
        this.document.hela_updated_by = value;
    }
    get updatedBy() {
        return this.document.hela_updated_by;
    }

    set updatedAt(value) {
        this.document.hela_updated_at = value;
    }
    get updatedAt() {
        return this.document.hela_updated_at;
    }

    set isDeleted(value) {
        this.document.hela_is_deleted = value;
    }
    get isDeleted() {
        return this.document.hela_is_deleted;
    }

    static get(filter, join, sort, offset, limit) {
        var promise = new Promise((resolve, reject) => {
            //Fetch from DB
            global.employeeLeaveApplicationDBService.get(filter, join, sort, offset, limit).then(
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

    save() {
        let record = this.document;
        delete record._type;
        var promise = new Promise((resolve, reject) => {
            //Insert into DB
            global.employeeLeaveApplicationDBService.insert(record).then((res) => {
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
            global.employeeLeaveApplicationDBService.update(dataToBeUpdt, filter).then(
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
            global.employeeLeaveApplicationDBService.update(dataToBeUpdt, filter, updatedBy).then(
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

module.exports = EmployeeLeaveApplication;  

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