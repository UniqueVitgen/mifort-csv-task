import { csvFileConfig } from "../config/config";


const csv = require('csv-parser');
const fs = require('fs');
export class CsvWorker {

  readFromFile(filename: string): Promise<any[]> {
    const results: any[] = [];
    // Создаётся объект promise
    let promise = new Promise<any[]>((resolve: any, reject: any) => {

        fs.createReadStream(filename)
          .pipe(csv())
          .on('data', (el: any) => {
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

  writeToFile(filename: string, objectList: any[]): Promise<any> {
    return new Promise((resolve, reject) => {
      let csvObjectList = this.convertArrayOfObjectsToCSV(objectList, csvFileConfig.columnDelimeter, csvFileConfig.lineDelimeter);
      let that = this;
      fs.writeFile(filename, csvObjectList, function (err: any) {
        if (err) {console.error(err); reject(err)}
        else {
          resolve()
        }
      });
    });
  }

  private convertArrayOfObjectsToCSV(data: any, columnDelimiter: any, lineDelimiter: any) {  
    var result: any, ctr: any, keys: any ;

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

    data.forEach(function(item: any) {
        ctr = 0;
        keys.forEach(function(key: any) {
            if (ctr > 0) result += columnDelimiter;

            result += item[key];
            ctr++;
        });
        result += lineDelimiter;
    });
    return result;
}
}