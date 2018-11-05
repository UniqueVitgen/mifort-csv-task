"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const csv_worker_1 = require("./src/typescript/workers/csv.worker");
const validator_worker_1 = require("./src/typescript/workers/validator.worker");
const database_worker_1 = require("./src/typescript/workers/database.worker");
const parsed_object_worker_1 = require("./src/typescript/workers/parsed-object.worker");
const config_1 = require("./src/typescript/config/config");
const results = [];
const filename = 'users.csv';
function main() {
    let csvWorker = new csv_worker_1.CsvWorker();
    let validatorWorker = new validator_worker_1.ValidatorWorker();
    let databaseWorker = new database_worker_1.DatabaseWorker();
    databaseWorker.createDatabaseIfNotExists(config_1.dbConfig.database).then(() => {
        csvWorker.readFromFile('src/resources/csv/users.csv').then(function (rows) {
            let parsedObjectList = validatorWorker.validateObjectList(rows);
            // console.log('parsedObjectList', parsedObjectList);
            databaseWorker.createTableIfNotExists(config_1.dbConfig.table, config_1.csvConfig.db).then((query => {
                console.log('query', query);
                databaseWorker.insertIntoTableByParsedObject(config_1.dbConfig.table, config_1.csvConfig.db, parsedObjectList).then((resInsert) => {
                    console.log(resInsert);
                    // databaseWorker.selectObjectFromTable(dbConfig.table).then(resultSelect => {
                    // })
                });
                csvWorker.writeToFile('src/resources/csv/newusers.csv', parsed_object_worker_1.ParsedObjectWorker.getInvalidObjectListFromParsedObjectList(parsedObjectList));
            }));
        });
    }, (err) => {
        console.log('err 1');
    });
}
main();
//# sourceMappingURL=index.js.map