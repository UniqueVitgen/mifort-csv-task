
import { disconnect } from 'cluster';
import { ValidatorWorker } from './src/typescript/workers/validator.worker';
import { DatabaseWorker } from './src/typescript/workers/database.worker';
import { ParsedObjectWorker } from './src/typescript/workers/parsed-object.worker';
import { dbConfig, csvConfig } from './src/typescript/config/config';
import { FileWorker } from './src/typescript/workers/file.worker';
import { CsvWorker } from './src/typescript/workers/csv-file.worker';

const results: any[] = [];
const filename = 'users.csv';

function main() {
  let csvWorker = new CsvWorker();
  let validatorWorker = new ValidatorWorker();
  let databaseWorker = new DatabaseWorker();
  databaseWorker.createDatabaseIfNotExists(dbConfig.database).then(() => {
    csvWorker.readFromFile('src/resources/csv/users.csv').then(function (rows: any) {
      let parsedObjectList = validatorWorker.validateObjectList(rows);
      databaseWorker.createTableIfNotExists(dbConfig.table, csvConfig.db).then((query => {
        databaseWorker.insertIntoTableByParsedObject(dbConfig.table,csvConfig.db,parsedObjectList).then((resInsert) => {
        });
        const invalidObjectList =  ParsedObjectWorker.getInvalidObjectListFromParsedObjectList(parsedObjectList);
        const invalidParsedObjectList = ParsedObjectWorker.getInvalidParsedObjectListFromParsedObjectList(parsedObjectList);
        const invalidText = ParsedObjectWorker.getErrorListFromParsedObjectList(invalidParsedObjectList);
        csvWorker.writeToFile('src/resources/csv/newusers.csv', invalidObjectList);
        FileWorker.writeFile('src/resources/csv/error.txt', invalidText);
        console.log('output csv file: ', 'src/resources/csv/newusers.csv');
        console.log('output text file: ', 'src/resources/csv/error.txt');
      }));
    })
  }, (err: any) => {
    console.log('err 1');
  });
}

main();

