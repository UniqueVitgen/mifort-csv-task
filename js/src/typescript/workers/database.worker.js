"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysqlWorker = __importStar(require("mysql"));
const csv_user_worker_1 = require("./csv-user.worker");
const config_1 = require("../config/config");
// var mysql = require('mysql');
class DatabaseWorker {
    constructor() {
        this.isTryConnect = false;
        // this.connect();
    }
    connect(databaseName) {
        return new Promise((resolve, reject) => {
            this.connection = mysqlWorker.createConnection({
                host: config_1.dbConfig.host,
                user: config_1.dbConfig.user,
                password: config_1.dbConfig.password,
                database: databaseName
            });
            let that = this;
            that.isTryConnect = true;
            this.connection.connect(function (err) {
                that.isTryConnect = false;
                if (err) {
                    console.error(err);
                    reject(err);
                }
                else
                    resolve();
            });
        });
    }
    query(query, database) {
        return new Promise((resolve, reject) => {
            this.connect(database).then(() => {
                if (this.connection.state == 'authenticated') {
                    this.connection.query(query, (errQuery, resultQuery) => {
                        if (errQuery) {
                            console.error(errQuery);
                            reject(errQuery);
                        }
                        else {
                            this.disconect().then((res) => {
                                resolve(resultQuery);
                            });
                        }
                    });
                }
            });
        });
    }
    disconect() {
        return new Promise((resolve, reject) => {
            if (this.connection.state == 'authenticated') {
                try {
                    this.connection.destroy();
                    resolve();
                }
                catch (err) {
                    console.error(err);
                    reject(err);
                }
            }
        });
    }
    insertIntoTable(tablename, columnProperties, csvUserList) {
        return new Promise((resolve, reject) => {
            if (csvUserList.length > 0) {
                let query = this.generateInsertIntoQueryString(tablename, columnProperties, csvUserList);
                console.log(query);
                this.query(query, config_1.dbConfig.database).then(res => {
                    resolve(res);
                }).catch(errQuery => reject(errQuery));
            }
            else {
                resolve('csvUserList length = 0');
            }
        });
    }
    insertIntoTableByParsedObject(tablename, columnProperties, parsedObjectList) {
        parsedObjectList = parsedObjectList.filter((parsedObject) => {
            return parsedObject.isValid;
        });
        let csvUserList = parsedObjectList.map(parsedObject => parsedObject.object);
        return this.insertIntoTable(tablename, columnProperties, csvUserList);
    }
    generateInsertIntoQueryString(tablename, columnProperties, csvUserList) {
        let query = 'INSERT INTO ' + tablename;
        query += '\n(';
        columnProperties.forEach((property, index) => {
            query += '\`' + property.name + '\`';
            if (index != columnProperties.length - 1) {
                query += ',';
            }
        });
        query += ')\nVALUES';
        let databaseUserList = csv_user_worker_1.CsvUserWorker.convertCsvUserListToDatabaseUserList(csvUserList);
        databaseUserList.forEach((csvUser, csvUserIndex) => {
            columnProperties.forEach((property, Propertyindex) => {
                if (Propertyindex == 0) {
                    query += '(';
                }
                query += "\'" + csvUser[property.name] + "\'";
                if (Propertyindex == columnProperties.length - 1) {
                    query += ')';
                }
                else {
                    query += ',';
                }
            });
            if (csvUserIndex != databaseUserList.length - 1) {
                query += "\,";
            }
            query += '\n';
        });
        console.log('query', query);
        return query;
    }
    createDatabaseIfNotExists(databaseName) {
        return new Promise((resolve, reject) => {
            let that = this;
            this.query('CREATE DATABASE IF NOT EXISTS ' + databaseName + ';').then(result => {
                resolve(result);
            });
        });
    }
    selectObjectFromTable(table) {
        return new Promise((resolve, reject) => {
            let that = this;
            this.query('select * from ' + table, config_1.dbConfig.database).then(resultQuery => {
                console.log(resultQuery);
                resolve(resultQuery);
            }).catch(errorQuery => { reject(errorQuery); });
        });
    }
    generateCreateTableIfNotExistsQueryString(table, properties) {
        let query = 'CREATE Table IF NOT EXISTS ' + table + ' (\n';
        properties.forEach((property, index) => {
            query += "`" + property.name + "` " + property.type + ' NOT NULL';
            if (index != properties.length - 1) {
                query += '\n,';
            }
        });
        query += ')';
        return query;
    }
    createTableIfNotExists(table, properties) {
        return new Promise((resolve, reject) => {
            let query = this.generateCreateTableIfNotExistsQueryString(table, properties);
            this.query(query, config_1.dbConfig.database).then((res) => {
                resolve(res);
            });
        });
    }
}
exports.DatabaseWorker = DatabaseWorker;
//# sourceMappingURL=database.worker.js.map