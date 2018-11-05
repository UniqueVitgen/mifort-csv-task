import { expect } from 'chai';
import { CsvUserWorker } from '../../typescript/workers/csv-user.worker';
import { CsvUser } from '../../typescript/classes/CsvUser';
import { CsvWorker } from '../../typescript/workers/csv.worker';


describe('CsvUserWorker class', () => {
  let sourceObject: any;
  let invalidSourceObject: any;
  let targetObject: CsvUser; 
  let invalidTargetObject: CsvUser;
  let databaseObject: any;
  let invalidDatabaseObject: any;
  let databaseUserList: any[];
  let invalidDatabaseUserList: any[];
  let csvUserList: CsvUser[];
  let invalidCsvUserList: CsvUser[];
  before(() => {
    sourceObject ={
      Name: 'Dima',
      Surname: 'Dmitriev',
      Mail: 'dima@mail.ru',
      'Date of registration': '02.05.2016',
      Phone: '+375 29 3526547'
    };
    targetObject = CsvUserWorker.parseObjectToCsvUser(sourceObject);
    invalidSourceObject = {
      Date: '02.05.2016',
      Phone: '+375 29 3526547'
    };
    invalidTargetObject = CsvUserWorker.parseObjectToCsvUser(invalidSourceObject);
    databaseObject = CsvUserWorker.convertToDatabaseObject(targetObject);
    invalidDatabaseObject = CsvUserWorker.convertToDatabaseObject(invalidTargetObject);
    csvUserList = [targetObject];
    invalidCsvUserList = [invalidTargetObject];
    databaseUserList = CsvUserWorker.convertCsvUserListToDatabaseUserList(csvUserList);
    invalidDatabaseUserList = CsvUserWorker.convertCsvUserListToDatabaseUserList(invalidCsvUserList);
  });
  
  describe('parseObjectToCsvUser function', () => {
    it('should return true', () => {
      const result = CsvUserWorker.checkIfAllFieldFilled(targetObject);
      expect(result).to.equal(true);
    });
  
    it('shoud return false', () => {
      const result = CsvUserWorker.checkIfAllFieldFilled(invalidTargetObject);
      expect(result).to.equal(false);
    })
  });
  
  describe('checkIfAllFieldFilled function', () => {
  
    it('shoud return false', () => {
      const result = CsvUserWorker.checkIfAllFieldFilled(invalidTargetObject);
      expect(result).to.equal(false);
    })
  
    it('shoud return true', () => {
      const result = CsvUserWorker.checkIfAllFieldFilled(targetObject);
      expect(result).to.equal(true);
    })
  
  });
  
  describe("convertToDatabaseObject function", () => {
  
    it('shoud return true', () => {
      const result = CsvUserWorker.checkIfAllFieldFilled(databaseObject);
      expect(result).to.equal(true);
    })
  
    it('shoud return false', () => {
      const result = CsvUserWorker.checkIfAllFieldFilled(invalidDatabaseObject);
      expect(result).to.equal(false);
    });
  
    describe('convertCsvUserListToDatabaseUserList function', () => {
      it('should return valid array of CsvUser', () => {
        const result = databaseUserList.length == 1 && CsvUserWorker.checkIfAllFieldFilledInArray(databaseUserList);
        expect(result).to.equal(true);
      })
  
      it('should return invalid array of CsvUser', () => {
        const result = databaseUserList.length == 1 && CsvUserWorker.checkIfAllFieldFilledInArray(invalidDatabaseUserList);
        expect(result).to.equal(false);
      })
    })
  
    describe('checkIfAllFieldFilledInArray function', () => {
      it('should return valid array of csvUser', () => {
        const result = CsvUserWorker.checkIfAllFieldFilledInArray(csvUserList);
        expect(result).to.equal(true);
  
      });
  
      it('should return invalid array of csvUser', () => {
        const result = csvUserList.length == 1 && CsvUserWorker.checkIfAllFieldFilledInArray(invalidCsvUserList);
        expect(result).to.equal(false);
      })
    })
  
  });
})