import { CsvWorker } from "../../typescript/workers/csv.worker";
import { resolve } from "url";


describe('CsvWorker class', () => {
  let csvWorker: CsvWorker;
  let dirnameResources: string;
  let realFile: string;
  let falseFile: string;
  let testFilepath: string;
  let realFilepath: string;
  let sourceObject: any;
  let sourceObjectList: any[];

  before(() => {
    csvWorker = new CsvWorker();
    dirnameResources = 'src/resources/csv/';
    realFile = 'users.csv';
    falseFile = 'test.csv';
    testFilepath = dirnameResources + falseFile;
    realFilepath = dirnameResources + realFile;
    sourceObject = {
      Name: 'Dima',
      Surname: 'Dmitriev',
      Mail: 'dima@mail.ru',
      'Date of registration': '02.05.2016',
      Phone: '+375 29 3526547'
    };
    sourceObjectList = [sourceObject];
    // mock = sinon.mock(require('mysql'))
    // mock.expects('query').with(queryString, queryParams).yields(null, rows);
  });

  describe('readFromFile', () => {
    it('should resolve', (done) => {
      csvWorker.readFromFile(dirnameResources + realFile).then(res => {
        done();
      })
    })
  });


  describe('writeToFile ', () => {
    it('should resolve', (done) => {
      csvWorker.writeToFile(testFilepath, sourceObjectList).then(resolve => {
        csvWorker.deleteFile(testFilepath);
        done();
      })
      // csvWorker.deleteFile(dirnameResources + falseFile);
    })
  });

})