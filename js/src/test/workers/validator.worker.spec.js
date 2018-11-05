"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validator_worker_1 = require("../../typescript/workers/validator.worker");
const chai_1 = require("chai");
const ParsedObject_1 = require("../../typescript/classes/ParsedObject");
const config_1 = require("../../typescript/config/config");
describe('ValidatorWorker class', () => {
    let sourceObject;
    let sourceObjectList;
    let invalidSourceObjectWrongEmail;
    let invalidSourceObjectWrongDate;
    let validatorWorker;
    let parsedObject;
    let invalidParsedObject;
    let invalidParsedObjectWrongDate;
    beforeEach(() => {
        validatorWorker = new validator_worker_1.ValidatorWorker();
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
        };
        sourceObjectList = [sourceObject, invalidSourceObjectWrongDate, invalidSourceObjectWrongEmail];
        parsedObject = new ParsedObject_1.ParsedObject(sourceObject);
        invalidParsedObject = new ParsedObject_1.ParsedObject(invalidSourceObjectWrongEmail);
        invalidParsedObjectWrongDate = new ParsedObject_1.ParsedObject(invalidSourceObjectWrongDate);
    });
    describe('validateObject function', () => {
        it('errorList length equals 0', () => {
            let parsedObjectWithValidate = validatorWorker.validateObject(sourceObject);
            let result = parsedObjectWithValidate.errorList.length == 0;
            chai_1.expect(result).to.equal(true);
        });
        it('errorList length equal 1', () => {
            let invalidParsedObjectWithValidate = validatorWorker.validateObject(invalidSourceObjectWrongEmail);
            let result = invalidParsedObjectWithValidate.errorList.length == 1;
            chai_1.expect(result).to.equal(true);
        });
    });
    describe('validateField function', () => {
        it('should return empty errorList', () => {
            let testParsedObject = validatorWorker.validateField(parsedObject, 'Name', config_1.csvConfig.csv[0]);
            let result = testParsedObject.errorList.length == 0;
            chai_1.expect(result).to.equal(true);
        });
        it('should return non empty errorList', () => {
            let testParsedObject = validatorWorker.validateField(invalidParsedObject, 'Mail', config_1.csvConfig.csv[1]);
            let result = testParsedObject.errorList.length == 1;
            chai_1.expect(result).to.equal(true);
        });
    });
    describe('validateDateTypeOfParsedObject function', () => {
        it('should return non empty error list', () => {
            let testParsedObject = validatorWorker.validateDateTypeOfParsedObject(invalidParsedObjectWrongDate);
            let result = testParsedObject.errorList.length == 1;
            chai_1.expect(result).to.equal(true);
        });
        it('should return empty error list', () => {
            let testParsedObject = validatorWorker.validateDateTypeOfParsedObject(parsedObject);
            let result = testParsedObject.errorList.length == 0;
            chai_1.expect(result).to.equal(true);
        });
    });
    describe('validateFieldByType function', () => {
        it('should return empty error list', () => {
            let testParsedObject = validatorWorker.validateFieldByType(parsedObject, 'Name', config_1.csvConfig.csv[0]);
            let result = testParsedObject.errorList.length == 0;
            chai_1.expect(result).to.equal(true);
        });
        it('should return non empty error list', () => {
            let testParsedObject = validatorWorker.validateFieldByType(invalidParsedObjectWrongDate, 'Date of registration', config_1.csvConfig.csv[4]);
            let result = testParsedObject.errorList.length == 1;
            chai_1.expect(result).to.equal(true);
        });
    });
    describe('validateFieldByValidators function', () => {
        it('should return empty error list', () => {
            let testParsedObject = validatorWorker.validateFieldByValidators(parsedObject, 'Name', config_1.csvConfig.csv[0]);
            let result = testParsedObject.errorList.length == 0;
            chai_1.expect(result).to.equal(true);
        });
        it('should return non empty return list', () => {
            let testParsedObject = validatorWorker.validateFieldByValidators(invalidParsedObject, 'Mail', config_1.csvConfig.csv[1]);
            let result = testParsedObject.errorList.length == 1;
            chai_1.expect(result).to.equal(true);
        });
    });
    describe('validateFieldList function', () => {
        it('shoulld return empty error list', () => {
            let testParsedObject = validatorWorker.validateFieldList(parsedObject);
            let result = testParsedObject.errorList.length == 0;
            chai_1.expect(result).to.equal(true);
        });
        it('should return non empty error list', () => {
            let testParsedObject = validatorWorker.validateFieldList(invalidParsedObject);
            let result = testParsedObject.errorList.length == 1;
            chai_1.expect(result).to.equal(true);
        });
    });
    describe('validateFieldListByObject function', () => {
        it('should return empty error list', () => {
            let testParsedObject = validatorWorker.validateFieldListByObject(sourceObject);
            let result = testParsedObject.errorList.length == 0;
            chai_1.expect(result).to.equal(true);
        });
        it('should return non empty error list cause wrong date', () => {
            let testParsedObject = validatorWorker.validateFieldListByObject(invalidSourceObjectWrongDate);
            let result = testParsedObject.errorList.length > 0;
            chai_1.expect(result).to.equal(true);
        });
    });
    describe('validateObjectList function', () => {
        it('should return empty error list', () => {
            let testParsedObjectList = validatorWorker.validateObjectList(sourceObjectList);
            let result = testParsedObjectList[0].errorList.length == 0;
            chai_1.expect(result).to.equal(true);
        });
        it('should return non empty error list cause wrong date', () => {
            let testParsedObjectList = validatorWorker.validateObjectList(sourceObjectList);
            let result = testParsedObjectList[1].errorList.length > 0;
            chai_1.expect(result).to.equal(true);
        });
    });
});
//# sourceMappingURL=validator.worker.spec.js.map