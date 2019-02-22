var _ = require('underscore');
module.exports = function () {
    var obj = {
        select: function (tableName, select, query, join, sort, offset, limit, groupBy, distinct) {
            var deferred = global.q.defer();
            var findQuery = global.knex.select(select).from(tableName);
            if (distinct) {
                findQuery.distinct(distinct);
            }
            if (join && join.length > 0) {
                findQuery = _processJoin(findQuery, join);
            }
            if (query && Object.keys(query).length > 0) {
                findQuery = _processQuery(findQuery, query);
            }
            if (sort) {
                //var keys = Object.keys(sort);
                for (var key in sort) {
                    var direction = null;
                    if (sort[key] === 1) {
                        direction = 'asc';
                    } else {
                        direction = 'desc';
                    }
                    findQuery = findQuery.orderBy(key, direction);
                }
            }
            if (offset) {
                findQuery = findQuery.offset(offset);
            }
            if (limit) {
                findQuery = findQuery.limit(limit);
            }
            if (groupBy) {
                findQuery = findQuery.groupBy(groupBy);
            }
            findQuery.then(function (res) {
                deferred.resolve(res);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        },

        insert: function (tableName, data, returnKey) {
            var deferred = global.q.defer();
            var insertQuery = global.knex.insert(data, returnKey).into(tableName);
            insertQuery.then(function (res) {
                console.log('Done');
                console.log(res);
                if (returnKey) {
                    if (data instanceof Array && res.length) {
                        for (var i = 0; i < res.length; i++) {
                            data[i][returnKey] = res[i];
                        }
                    } else {
                        data[returnKey] = res[res.length - 1];
                    }
                }
                deferred.resolve(data);
            }, function (err) {
                console.log('Error');
                console.log(err);
                deferred.reject(err);
            });
            return deferred.promise;
        },

        delete: function (tableName, query) {

            var deferred = global.q.defer();
            var deleteQuery = global.knex(tableName);
            deleteQuery = _processQuery(deleteQuery, query);
            deleteQuery.del().then(function (res) {
                if (typeof res === 'number') {
                    res = 'Success';
                    deferred.resolve(res);
                } else {
                    deferred.reject('error');
                }
            }, function (err) {
                console.log('Error');
                console.log(err);
                deferred.reject(err);
            });
            return deferred.promise;
        },
        update: function (tableName, data, query) {
            var deferred = global.q.defer();
            var updateQuery = global.knex(tableName);
            updateQuery = _processQuery(updateQuery, query);
            if (data.eligibility) {
                data.eligibility = JSON.stringify(data.eligibility);
            }
            updateQuery.update(data).then(function (res) {
                console.log('Done');
                console.log(res);
                if (typeof res === 'number') {
                    res = 'Success';
                    deferred.resolve(res);
                } else {
                    deferred.reject('error');
                }
            }, function (err) {
                console.log('Error');
                console.log(err);
                deferred.reject(err);
            });
            return deferred.promise;
        },

        bulkInsert: function (tableName, data) {
            var deferred = global.q.defer();
            var insertQuery = [];
            for (var i = 0; i < data.length; i++) {
                insertQuery.push(global.knex.insert(data[i]).into(tableName));
            }

            global.q.all(insertQuery).then(function (res) {
                console.log('Done');
                console.log(res);
                deferred.resolve('Bulk Insert Done');
            }, function (err) {
                console.log('Error');
                console.log(err);
                deferred.reject(err);
            });
            return deferred.promise;
        }
    };
    return obj;
};

/**
 *
 * @param findQuery
 * @param join
 * @returns {*}
 * @private
 */

function _processJoin(findQuery, join) {
    for (var i = 0; i < join.length; i++) {
        if (!join[i].type) {
            findQuery = findQuery.join(join[i].tableName, join[i].cName1, '=', join[i].cName2);
        } else if (join[i].type === 'left') {
            findQuery = findQuery.leftJoin(join[i].tableName, join[i].cName1, '=', join[i].cName2);
        } else if (join[i].type === 'right') {
            findQuery = findQuery.rightJoin(join[i].tableName, join[i].cName1, '=', join[i].cName2);
        } else if (join[i].type === 'fullOuterJoin') {
            findQuery = findQuery.fullOuterJoin(join[i].tableName, join[i].cName1, '=', join[i].cName2);
        } if (join[i].type === 'raw') {
            findQuery = findQuery.joinRaw(join[i].raw);
        }
    }
    return findQuery;
}

/**
 * Note Here the or query works for just two levels right now.
 * @param findQuery
 * @param query
 * @returns {*}
 * @private
 */

function _processQuery(findQuery, query) {
    if (Object.keys.length > 0) {
        _.map(query, function (value, key) {
            if (key === '$equalTo') {
                findQuery.where(value);
            } else if (key === '$notEqualTo') {
                findQuery.whereNot(value);
            } else if (key === '$or') {
                findQuery.where(function () {
                    this.where(value[0].column, value[0].operator, value[0].value)
                        .orWhere(value[1].column, value[1].operator, value[1].value);
                });
            } else if (key === '$gt') {
                findQuery.where(value.column, '>', value.value);
            } else if (key === '$lt') {
                findQuery.where(value.column, '<', value.value);
            } else if (key === '$lte') {
                findQuery.where(value.column, '<=', value.value);
            } else if (key === '$gte') {
                findQuery.where(value.column, '>=', value.value);
            } else if (key === '$in') {
                findQuery.whereIn(value.column, value.value);
            } else if (key === '$orIn') {
                findQuery.orWhere(value.name, value.value);
            } else if (key === '$like') {
                findQuery.where(value.column, 'like', value.value);
            }
        });
    }
    return findQuery;
}
