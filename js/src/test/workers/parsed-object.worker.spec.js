"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const csv_user_worker_1 = require("../../typescript/workers/csv-user.worker");
const parsed_object_worker_1 = require("../../typescript/workers/parsed-object.worker");
const ParsedObject_1 = require("../../typescript/classes/ParsedObject");
const chai_1 = require("chai");
const date_time_worker_1 = require("../../typescript/workers/date-time.worker");
const config_1 = require("../../typescript/config/config");
// import  from '../log/out'
function log(message) {
    console.log(message);
}
;
describe('ParsedObjectWorker class', () => {
    let sourceObject;
    let invalidSourceObject;
    let invalidSourceObject2;
    let csvUser;
    let invalidCsvUser;
    let invalidCsvUser2;
    let csvUserList;
    let parsedObject;
    let invalidParsedObject;
    let invalidParsedObject2;
    let parsedObjectList;
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
        };
        invalidSourceObject2 = {
            Name: 'Dima',
            Surname: 'Dmitriev',
            Mail: 'dima@mail.ru',
            'Date of registration': '02.05.2016',
            Phone: '+375 fsdfdsf29 3526547'
        };
        csvUser = csv_user_worker_1.CsvUserWorker.parseObjectToCsvUser(sourceObject);
        invalidCsvUser = csv_user_worker_1.CsvUserWorker.parseObjectToCsvUser(invalidSourceObject);
        invalidCsvUser2 = csv_user_worker_1.CsvUserWorker.parseObjectToCsvUser(invalidSourceObject2);
        // csvUserList
        csvUserList = [csvUser, invalidCsvUser, invalidCsvUser2];
        // ParsedObjectWorker.
        parsedObject = new ParsedObject_1.ParsedObject(csvUser);
        invalidParsedObject = new ParsedObject_1.ParsedObject(invalidCsvUser);
        invalidParsedObject2 = new ParsedObject_1.ParsedObject(invalidCsvUser2);
        parsedObjectList = [parsedObject, invalidParsedObject, invalidParsedObject2];
        // ParsedObjectWorker.getObjectListFromParsedObjectList()
    });
    describe('getObjectListFromParsedObjectList function', () => {
        it('should return validSourceObject', () => {
            const returnedSourceObject = parsed_object_worker_1.ParsedObjectWorker.getObjectListFromParsedObjectList(parsedObjectList)[0];
            let result = true;
            for (let prop in config_1.csvConfig.csv) {
                if (sourceObject[prop] != returnedSourceObject[prop] && returnedSourceObject[prop] == null) {
                    if (prop == 'Date of registration') {
                        if (date_time_worker_1.DateTimeWorker.compareDates(sourceObject[prop], returnedSourceObject[prop])) {
                            result = false;
                        }
                    }
                    else {
                        result = false;
                    }
                }
            }
            chai_1.expect(result).to.equal(true);
        });
        it('should return invalidSourceObject', () => {
            const returnedSourceObject = parsed_object_worker_1.ParsedObjectWorker.getObjectListFromParsedObjectList(parsedObjectList)[1];
            let result = true;
            for (let prop in config_1.csvConfig.csv) {
                if (sourceObject[prop] != returnedSourceObject[prop] && returnedSourceObject[prop] == null) {
                    if (prop == 'Date of registration') {
                        if (date_time_worker_1.DateTimeWorker.compareDates(sourceObject[prop], returnedSourceObject[prop])) {
                            result = false;
                        }
                    }
                    else {
                        result = false;
                    }
                }
            }
            chai_1.expect(result).to.equal(true);
        });
    });
    describe('getValidParsedObjectListFromParsedObjectList function', () => {
        it('should return valid array of parsed object, which length equal 1', () => {
            let testParsedObjectList = parsed_object_worker_1.ParsedObjectWorker.getValidParsedObjectListFromParsedObjectList(parsedObjectList);
            let result = testParsedObjectList.length == 1;
            chai_1.expect(result).to.equal(result);
        });
    });
    describe('getValidObjectListFromParsedObjectList function', () => {
        it('should return valid array of parsed object, which length equal 1', () => {
            let testParsedObjectList = parsed_object_worker_1.ParsedObjectWorker.getValidObjectListFromParsedObjectList(parsedObjectList);
            let result = testParsedObjectList.length == 1;
            chai_1.expect(result).to.equal(result);
        });
    });
    describe('getInvalidParsedObjectListFromParsedObjectList function', () => {
        it('should return valid array of parsed object, which length equal 2', () => {
            let testParsedObjectList = parsed_object_worker_1.ParsedObjectWorker.getInvalidParsedObjectListFromParsedObjectList(parsedObjectList);
            let result = testParsedObjectList.length == 2;
            chai_1.expect(result).to.equal(result);
            ;
        });
    });
    describe('getInvalidObjectListFromParsedObjectList function', () => {
        it('should return valid array of parsed object, which length equal 2', () => {
            let testParsedObjectList = parsed_object_worker_1.ParsedObjectWorker.getInvalidObjectListFromParsedObjectList(parsedObjectList);
            let result = testParsedObjectList.length == 2;
            chai_1.expect(result).to.equal(result);
            ;
        });
    });
});
//# sourceMappingURL=parsed-object.worker.spec.js.map