import * as sinon from 'sinon';
import { csvConfig, dbConfig } from '../../typescript/config/config';
import { DatabaseWorker } from '../../typescript/workers/database.worker';
import { resolve } from 'url';
import { expect } from 'chai';
import { CsvUser } from '../../typescript/classes/CsvUser';
import { CsvUserWorker } from '../../typescript/workers/csv-user.worker';
import { ParsedObject } from '../../typescript/classes/ParsedObject';
import { ValidatorWorker } from '../../typescript/workers/validator.worker';

describe('databaseWorker class', () => {
  let databaseWorker: DatabaseWorker;
  let sourceObject: any;
  let sourceObjectList: any[];
  let csvUser: CsvUser;
  let csvUserList: CsvUser[];
  let parsedObjectList: ParsedObject[];
  let validatorWorker: ValidatorWorker;
  before(() => {
    sourceObject = {
      Name: 'Dima',
      Surname: 'Dmitriev',
      Mail: 'dima@mail.ru',
      'Date of registration': '02.05.2016',
      Phone: '+375 29 3526547'
    };
    let validatorWorker = new ValidatorWorker();
    sourceObjectList = [sourceObject];
    databaseWorker = new DatabaseWorker();
    csvUser = CsvUserWorker.parseObjectToCsvUser(sourceObject);
    csvUserList = [csvUser];
    parsedObjectList = validatorWorker.validateObjectList(sourceObjectList);
  });
    
  describe('connect and disconnect function', () => {
    it('should connect to the database, then disconnect from database', (done) => {
      databaseWorker.connect(dbConfig.database).then(res => {
        databaseWorker.disconect().then(res => {
          done();
        })
      })
    })
  });

  describe('sselectObjectFromTable function', () => {
    it('should resolve', (done) => {
      databaseWorker.selectObjectFromTable(dbConfig.table).then(resolve => {
        done();
      })
    });
    //!!!!!!!!!! uncomment in future
    // it('should reject', (done) => {
    //   databaseWorker.selectObjectFromTable('nam nam').catch(resolve => {
    //     done();
    //   });
    // })
  });


  describe('generateCreateTableIfNotExistsQueryString function', () => {
    it('should generate right query', () => {
      let query = databaseWorker.generateInsertIntoQueryString(dbConfig.table, csvConfig.db,
        sourceObjectList);
      const expectedResult = `INSERT INTO csv_rows\n` +
        `(\`Name\`,\`Mail\`,\`Surname\`,\`Phone\`,\`Date of registration\`)\n` +
        `VALUES(\'Dima',\'dima@mail.ru\',\'Dmitriev\',\'+375 29 3526547\',\'2016-02-04\')\n`;
      let result = (query == expectedResult);
      // console.log(expectedResult);
      // console.log(query);
      expect(result).to.equal(true);
    });
  });

  describe('generateCreateTableIfNotExistsQueryString function', () => {
    it('should return true value', () => {

      let query = databaseWorker.generateCreateTableIfNotExistsQueryString(dbConfig.table, csvConfig.db);
      const expectedResult = `CREATE Table IF NOT EXISTS csv_rows (\n` +
        `\`id\` INT NOT NULL AUTO_INCREMENT,\n`+
        `\`Name\` varchar(255) NOT NULL,\n`+
        `\`Mail\` varchar(255) NOT NULL,\n`+
        `\`Surname\` varchar(255) NOT NULL,\n`+
        `\`Phone\` varchar(255) NOT NULL,\n`+
        `\`Date of registration\` Date NOT NULL,\n`+
        `PRIMARY KEY (\`id\`)\n`+
        `)`;
      let result = (query == expectedResult);
      // console.log(expectedResult);
      // console.log(query);
      expect(result).to.equal(true);
    })
  });


  describe('createDatabaseIfNotExists dropDatabaseIfExists functionList', () => {
    it('should resolve', (done) => {
      const testDatabase = 'test1';
      databaseWorker.createDatabaseIfNotExists(testDatabase).then(res => {
        databaseWorker.dropDatabaseIfExists(testDatabase).then(res => {
          done();
        })
      })
    })
  });

  describe('createTableIfNotExists dropTableIfExists', () => {
    it('should resolve', (done) => {
      const testTable = 'test1';
      databaseWorker.createTableIfNotExists(testTable, csvConfig.db).then(res => {
        databaseWorker.dropDatabaseIfExists(testTable).then(res => {
          done();
        })
      })
    })
  });

  describe('insertIntoTable', () => {
    it('should resolve', (done) => {
      const testTable = 'test1';
      databaseWorker.createTableIfNotExists(testTable, csvConfig.db).then(res => {
        databaseWorker.insertIntoTable(testTable, csvConfig.db, csvUserList).then(resultInsert => {
          console.log('reesult', resultInsert);
          databaseWorker.dropTableIfExists(testTable).then(res => {
            done();
          })
        })
      })
    })
  });

  describe('insertIntoTableByParsedObject', () => {
    it('should resolve', (done) => {
        const testTable = 'test2';
        databaseWorker.createTableIfNotExists(testTable, csvConfig.db).then(res => {
          databaseWorker.insertIntoTableByParsedObject(testTable, csvConfig.db, parsedObjectList).then(resultInsert => {
            // console.log('reesult', resultInsert);
            databaseWorker.dropTableIfExists(testTable).then(res => {
              done();
            })
          })
        })
      // 
    })
  })
})