import { ValidatorWorker } from "../../typescript/workers/validator.worker";
import { expect } from "chai";
import { csvConfig } from "../../typescript/config/config";
import { ParsedObject } from "../../typescript/classes/parsed-object";

describe('ValidatorWorker class',() => {

  let sourceObject: any;
  let sourceObjectList: any;
  let invalidSourceObjectWrongEmail: any;
  let invalidSourceObjectWrongDate: any;
  let validatorWorker: ValidatorWorker;
  let parsedObject: ParsedObject;
  let invalidParsedObject: ParsedObject;
  let invalidParsedObjectWrongDate: ParsedObject;
  beforeEach(() => {
    validatorWorker = new ValidatorWorker();
    sourceObject = {
      Name: 'Dima',
      Surname: 'Dmitriev',
      Mail: 'dima@mail.ru',
      'Date of registration': '02.05.2016',
      Phone: '+375 29 3526547'
    };
    invalidSourceObjectWrongEmail = {
      Name: 'Dima',
      Surname: 'Dmitriev',
      Mail: 'Dima@mail.ru',
      'Date of registration': '02.05.2016',
      Phone: '+375 29 3526547'
    };
    invalidSourceObjectWrongDate = {
      Name: 'Dima',
      Surname: 'Dmitriev',
      Mail: 'Dima@mail.ru',
      'Date of registration': '22.22.2016',
      Phone: '+375 29 3526547'

    }
    sourceObjectList = [sourceObject, invalidSourceObjectWrongDate, invalidSourceObjectWrongEmail];
    parsedObject = new ParsedObject(sourceObject);
    invalidParsedObject = new ParsedObject(invalidSourceObjectWrongEmail);
    invalidParsedObjectWrongDate = new ParsedObject(invalidSourceObjectWrongDate);
  });

  describe('validateObject function', () => {
    it('errorList length equals 0', () => {
      let parsedObjectWithValidate = validatorWorker.validateObject(sourceObject);
      let result = parsedObjectWithValidate.errorList.length == 0;
      expect(result).to.equal(true);
    });

    it('errorList length equal 1', () => {
      let invalidParsedObjectWithValidate = validatorWorker.validateObject(invalidSourceObjectWrongEmail);
      let result = invalidParsedObjectWithValidate.errorList.length == 1;
      expect(result).to.equal(true);
    })
  });

  describe('validateField function', () => {
    it('should return empty errorList',() => {
      let testParsedObject = validatorWorker.validateField(parsedObject, 'Name', csvConfig.csv[0]);
      let result = testParsedObject.errorList.length == 0;
      expect(result).to.equal(true);
    });

    it('should return non empty errorList', () => {
      let testParsedObject = validatorWorker.validateField(invalidParsedObject, 'Mail', csvConfig.csv[1]);
      let result = testParsedObject.errorList.length == 1;
      expect(result).to.equal(true);
    })
  });

  describe('validateDateTypeOfParsedObject function', () => {
    it('should return non empty error list', () => {
      let testParsedObject = validatorWorker.validateDateTypeOfParsedObject(invalidParsedObjectWrongDate);
      let result = testParsedObject.errorList.length == 1;
      // console.log('errorList', testParsedObject);
      expect(result).to.equal(true);
    });

    it('should return empty error list', () => {
      let testParsedObject = validatorWorker.validateDateTypeOfParsedObject(parsedObject);
      let result = testParsedObject.errorList.length == 0;
      expect(result).to.equal(true);
    })
  });

  describe('validateFieldByType function', () => {
    it('should return empty error list', () => {
      let testParsedObject = validatorWorker.validateFieldByType(parsedObject, 'Name', csvConfig.csv[0]);
      let result = testParsedObject.errorList.length == 0;
      expect(result).to.equal(true);
    });

    it('should return non empty error list', () => {
      let testParsedObject = validatorWorker.validateFieldByType(invalidParsedObjectWrongDate, 'Date of registration', csvConfig.csv[4]);
      let result = testParsedObject.errorList.length == 1;
      // console.log(testParsedObject.errorList);
      expect(result).to.equal(true);
    })
  });

  describe('validateFieldByValidators function', () => {
    it('should return empty error list', () => {
      let testParsedObject = validatorWorker.validateFieldByValidators(parsedObject, 'Name', csvConfig.csv[0]);
      let result = testParsedObject.errorList.length == 0;
      expect(result).to.equal(true);
    });

    it('should return non empty return list', () => {
      let testParsedObject = validatorWorker.validateFieldByValidators(invalidParsedObject, 'Mail', csvConfig.csv[1]);
      let result = testParsedObject.errorList.length == 1;
      expect(result).to.equal(true);
    })
  });

  describe('validateFieldList function', () => {
    it('shoulld return empty error list', () => {
      let testParsedObject = validatorWorker.validateFieldList(parsedObject);
      let result = testParsedObject.errorList.length == 0;
      expect(result).to.equal(true);
    });

    it('should return non empty error list', () => {
      let testParsedObject = validatorWorker.validateFieldList(invalidParsedObject);
      let result = testParsedObject.errorList.length == 1;
      expect(result).to.equal(true);
    })
  });

  describe('validateFieldListByObject function', () => {
    it('should return empty error list', () => {
      let testParsedObject = validatorWorker.validateFieldListByObject(sourceObject);
      let result = testParsedObject.errorList.length == 0;
      expect(result).to.equal(true);
    });

    it('should return non empty error list cause wrong date', () => {
      let testParsedObject = validatorWorker.validateFieldListByObject(invalidSourceObjectWrongDate);
      let result = testParsedObject.errorList.length > 0;
      expect(result).to.equal(true);
    })
  });

  describe('validateObjectList function', () => {
    it('should return empty error list', () => {
      let testParsedObjectList = validatorWorker.validateObjectList(sourceObjectList);
      let result = testParsedObjectList[0].errorList.length == 0;
      expect(result).to.equal(true);
    });

    it('should return non empty error list cause wrong date', () => {
      let testParsedObjectList = validatorWorker.validateObjectList(sourceObjectList);
      let result = testParsedObjectList[1].errorList.length > 0;
      expect(result).to.equal(true);
    })
  })

  
})