"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const csv_worker_1 = require("./workers/csv.worker");
const validator_worker_1 = require("./workers/validator.worker");
const results = [];
const filename = 'users.csv';
function main() {
    let csvWorker = new csv_worker_1.CsvWorker();
    let validatorWorker = new validator_worker_1.ValidatorWorker();
    csvWorker.readFromFile('users.csv').then(function (rows) {
        // console.log('rows', rows);
        let parsedObjectList = validator_worker_1.ValidatorWorker.validateObjectList(rows);
        // console.log('parsedObjectList', parsedObjectList);
    });
}
main();
//# sourceMappingURL=index.js.map