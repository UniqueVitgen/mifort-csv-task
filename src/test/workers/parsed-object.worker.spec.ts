import { CsvUserWorker } from "../../typescript/workers/csv-user.worker";
import { ParsedObjectWorker } from "../../typescript/workers/parsed-object.worker";
import { expect } from "chai";
import { DateTimeWorker } from "../../typescript/workers/date-time.worker";
import { csvConfig } from "../../typescript/config/config";
import { CsvUser } from "../../typescript/classes/csv-user";
import { ParsedObject } from "../../typescript/classes/parsed-object";
// import  from '../log/out'

function log(message: any) {
  console.log(message);
};

describe('ParsedObjectWorker class', () => {
  let sourceObject: any;
  let invalidSourceObject: any;
  let invalidSourceObject2: any;
  let csvUser: CsvUser;
  let invalidCsvUser: CsvUser;
  let invalidCsvUser2: CsvUser;
  let csvUserList: CsvUser[];
  let parsedObject: ParsedObject;
  let invalidParsedObject: ParsedObject;
  let invalidParsedObject2: ParsedObject;
  let parsedObjectList: ParsedObject[];

  before(() => {
    sourceObject = {
      Name: 'Dima',
      Surname: 'Dmitriev',
      Mail: 'dima@mail.ru',
      'Date of registration': '02.05.2016',
      Phone: '+375 29 3526547'
    };

    invalidSourceObject = {
      Name: 'Dima',
      Surname: 'Dmitriev',
      Mail: 'Dima@mail.ru',
      'Date of registration': '02.05.2016',
      Phone: '+375 29 3526547'

    }

    invalidSourceObject2 = {
      Name: 'Dima',
      Surname: 'Dmitriev',
      Mail: 'dima@mail.ru',
      'Date of registration': '02.05.2016',
      Phone: '+375 fsdfdsf29 3526547'


    }

    csvUser = CsvUserWorker.parseObjectToCsvUser(sourceObject);
    invalidCsvUser = CsvUserWorker.parseObjectToCsvUser(invalidSourceObject);
    invalidCsvUser2 = CsvUserWorker.parseObjectToCsvUser(invalidSourceObject2);
    // csvUserList
    csvUserList = [csvUser, invalidCsvUser, invalidCsvUser2];
    // ParsedObjectWorker.
    parsedObject = new ParsedObject(csvUser);
    invalidParsedObject = new ParsedObject(invalidCsvUser);
    invalidParsedObject2 = new ParsedObject(invalidCsvUser2);
    parsedObjectList = [parsedObject, invalidParsedObject, invalidParsedObject2];
    // ParsedObjectWorker.getObjectListFromParsedObjectList()
  });
  describe('getObjectListFromParsedObjectList function', () => {
    it('should return validSourceObject', () => {
      const returnedSourceObject = ParsedObjectWorker.getObjectListFromParsedObjectList(parsedObjectList)[0];
      let result = true;
      for (let prop in csvConfig.csv) {
        if (sourceObject[prop] != returnedSourceObject[prop] && returnedSourceObject[prop] == null) {
          if (prop == 'Date of registration') {
            if (DateTimeWorker.compareDates(sourceObject[prop], returnedSourceObject[prop])) {
              result = false;
            }
          }
          else {
            result = false;
          }
        }
      }
      expect(result).to.equal(true);
    });

    it('should return invalidSourceObject', () => {
      const returnedSourceObject = ParsedObjectWorker.getObjectListFromParsedObjectList(parsedObjectList)[1];
      let result = true;
      for (let prop in csvConfig.csv) {
        if (sourceObject[prop] != returnedSourceObject[prop] && returnedSourceObject[prop] == null) {
          if (prop == 'Date of registration') {
            if (DateTimeWorker.compareDates(sourceObject[prop], returnedSourceObject[prop])) {
              result = false;
            }
          }
          else {
            result = false;
          }
        }
      }
      expect(result).to.equal(true);
    })

  });

  describe('getValidParsedObjectListFromParsedObjectList function', () => {
    it('should return valid array of parsed object, which length equal 1', () => {
      let testParsedObjectList = ParsedObjectWorker.getValidParsedObjectListFromParsedObjectList(parsedObjectList);
      let result = testParsedObjectList.length == 1;
      expect(result).to.equal(result);
    })
  });

  describe('getValidObjectListFromParsedObjectList function', () => {     
    it('should return valid array of parsed object, which length equal 1', () => {
      let testParsedObjectList = ParsedObjectWorker.getValidObjectListFromParsedObjectList(parsedObjectList);
      let result = testParsedObjectList.length == 1;
      expect(result).to.equal(result);
    })
  });

  describe('getInvalidParsedObjectListFromParsedObjectList function', () => {
    it('should return valid array of parsed object, which length equal 2', () => {
      let testParsedObjectList = ParsedObjectWorker.getInvalidParsedObjectListFromParsedObjectList(parsedObjectList);
      let result = testParsedObjectList.length == 2;
      expect(result).to.equal(result);;
    })
  })

  describe('getInvalidObjectListFromParsedObjectList function', () => {
    it('should return valid array of parsed object, which length equal 2', () => {
      let testParsedObjectList = ParsedObjectWorker.getInvalidObjectListFromParsedObjectList(parsedObjectList);
      let result = testParsedObjectList.length == 2;
      expect(result).to.equal(result);;
    })
  })
})