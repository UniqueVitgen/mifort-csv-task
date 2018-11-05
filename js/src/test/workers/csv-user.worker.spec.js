"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const csv_user_worker_1 = require("../../typescript/workers/csv-user.worker");
describe('CsvUserWorker class', () => {
    let sourceObject;
    let invalidSourceObject;
    let targetObject;
    let invalidTargetObject;
    let databaseObject;
    let invalidDatabaseObject;
    let databaseUserList;
    let invalidDatabaseUserList;
    let csvUserList;
    let invalidCsvUserList;
    before(() => {
        sourceObject = {
            Name: 'Dima',
            Surname: 'Dmitriev',
            Mail: 'dima@mail.ru',
            'Date of registration': '02.05.2016',
            Phone: '+375 29 3526547'
        };
        targetObject = csv_user_worker_1.CsvUserWorker.parseObjectToCsvUser(sourceObject);
        invalidSourceObject = {
            Date: '02.05.2016',
            Phone: '+375 29 3526547'
        };
        invalidTargetObject = csv_user_worker_1.CsvUserWorker.parseObjectToCsvUser(invalidSourceObject);
        databaseObject = csv_user_worker_1.CsvUserWorker.convertToDatabaseObject(targetObject);
        invalidDatabaseObject = csv_user_worker_1.CsvUserWorker.convertToDatabaseObject(invalidTargetObject);
        csvUserList = [targetObject];
        invalidCsvUserList = [invalidTargetObject];
        databaseUserList = csv_user_worker_1.CsvUserWorker.convertCsvUserListToDatabaseUserList(csvUserList);
        invalidDatabaseUserList = csv_user_worker_1.CsvUserWorker.convertCsvUserListToDatabaseUserList(invalidCsvUserList);
    });
    describe('parseObjectToCsvUser function', () => {
        it('should return true', () => {
            const result = csv_user_worker_1.CsvUserWorker.checkIfAllFieldFilled(targetObject);
            chai_1.expect(result).to.equal(true);
        });
        it('shoud return false', () => {
            const result = csv_user_worker_1.CsvUserWorker.checkIfAllFieldFilled(invalidTargetObject);
            chai_1.expect(result).to.equal(false);
        });
    });
    describe('checkIfAllFieldFilled function', () => {
        it('shoud return false', () => {
            const result = csv_user_worker_1.CsvUserWorker.checkIfAllFieldFilled(invalidTargetObject);
            chai_1.expect(result).to.equal(false);
        });
        it('shoud return true', () => {
            const result = csv_user_worker_1.CsvUserWorker.checkIfAllFieldFilled(targetObject);
            chai_1.expect(result).to.equal(true);
        });
    });
    describe("convertToDatabaseObject function", () => {
        it('shoud return true', () => {
            const result = csv_user_worker_1.CsvUserWorker.checkIfAllFieldFilled(databaseObject);
            chai_1.expect(result).to.equal(true);
        });
        it('shoud return false', () => {
            const result = csv_user_worker_1.CsvUserWorker.checkIfAllFieldFilled(invalidDatabaseObject);
            chai_1.expect(result).to.equal(false);
        });
        describe('convertCsvUserListToDatabaseUserList function', () => {
            it('should return valid array of CsvUser', () => {
                const result = databaseUserList.length == 1 && csv_user_worker_1.CsvUserWorker.checkIfAllFieldFilledInArray(databaseUserList);
                chai_1.expect(result).to.equal(true);
            });
            it('should return invalid array of CsvUser', () => {
                const result = databaseUserList.length == 1 && csv_user_worker_1.CsvUserWorker.checkIfAllFieldFilledInArray(invalidDatabaseUserList);
                chai_1.expect(result).to.equal(false);
            });
        });
        describe('checkIfAllFieldFilledInArray function', () => {
            it('should return valid array of csvUser', () => {
                const result = csv_user_worker_1.CsvUserWorker.checkIfAllFieldFilledInArray(csvUserList);
                chai_1.expect(result).to.equal(true);
            });
            it('should return invalid array of csvUser', () => {
                const result = csvUserList.length == 1 && csv_user_worker_1.CsvUserWorker.checkIfAllFieldFilledInArray(invalidCsvUserList);
                chai_1.expect(result).to.equal(false);
            });
        });
    });
});
//# sourceMappingURL=csv-user.worker.spec.js.map