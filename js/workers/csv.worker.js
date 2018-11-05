"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
}
exports.CsvWorker = CsvWorker;
//# sourceMappingURL=csv.worker.js.map