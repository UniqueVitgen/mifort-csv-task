"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const csv = require('csv-parser');
const fs = require('fs');
class CsvWorker {
    readFromFile(filename) {
        const results = [];
        // Создаётся объект promise
        let promise = new Promise((resolve, reject) => {
            fs.createReadStream(filename)
                .pipe(csv())
                .on('data', (el) => {
                results.push(el);
            })
                .on('end', () => {
                // callback(results);
                resolve(results);
                // [
                //   { NAME: 'Daffy Duck', AGE: 24 },
                //   { NAME: 'Bugs Bunny', AGE: 22 }
                // ]
            });
        });
        return promise;
    }
    writeToFile(filename, objectList) {
        return new Promise((resolve, reject) => {
            let csvObjectList = this.convertArrayOfObjectsToCSV(objectList, config_1.csvFileConfig.columnDelimeter, config_1.csvFileConfig.lineDelimeter);
            let that = this;
            fs.writeFile(filename, csvObjectList, function (err) {
                if (err) {
                    console.error(err);
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
    convertArrayOfObjectsToCSV(data, columnDelimiter, lineDelimiter) {
        var result, ctr, keys;
        // data = args.data || null;
        if (data == null || !data.length) {
            return null;
        }
        columnDelimiter = columnDelimiter || ',';
        lineDelimiter = lineDelimiter || '\n';
        keys = Object.keys(data[0]);
        result = '';
        result += keys.join(columnDelimiter);
        result += lineDelimiter;
        data.forEach(function (item) {
            ctr = 0;
            keys.forEach(function (key) {
                if (ctr > 0)
                    result += columnDelimiter;
                result += item[key];
                ctr++;
            });
            result += lineDelimiter;
        });
        return result;
    }
}
exports.CsvWorker = CsvWorker;
//# sourceMappingURL=csv.worker.js.map