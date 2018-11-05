
import { disconnect } from 'cluster';
import { CsvWorker } from './src/typescript/workers/csv.worker';
import { ValidatorWorker } from './src/typescript/workers/validator.worker';
import { DatabaseWorker } from './src/typescript/workers/database.worker';
import { ParsedObjectWorker } from './src/typescript/workers/parsed-object.worker';
import { dbConfig, csvConfig } from './src/typescript/config/config';

const results: any[] = [];
const filename = 'users.csv';

function main() {
  let csvWorker = new CsvWorker();
  let validatorWorker = new ValidatorWorker();
  let databaseWorker = new DatabaseWorker();
  databaseWorker.createDatabaseIfNotExists(dbConfig.database).then(() => {
    csvWorker.readFromFile('src/resources/csv/users.csv').then(function (rows: any) {
      let parsedObjectList = validatorWorker.validateObjectList(rows);
      // console.log('parsedObjectList', parsedObjectList);
      databaseWorker.createTableIfNotExists(dbConfig.table, csvConfig.db).then((query => {
        console.log('query', query);
        databaseWorker.insertIntoTableByParsedObject(dbConfig.table,csvConfig.db,parsedObjectList).then((resInsert) => {
          console.log(resInsert);
          // databaseWorker.selectObjectFromTable(dbConfig.table).then(resultSelect => {
          // })
        });
        csvWorker.writeToFile('src/resources/csv/newusers.csv', ParsedObjectWorker.getInvalidObjectListFromParsedObjectList(parsedObjectList));
      }));
    })
  }, (err: any) => {
    console.log('err 1');
  });
}

main();

