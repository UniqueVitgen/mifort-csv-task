"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const date_time_worker_1 = require("../../typescript/workers/date-time.worker");
// if you used the '@types/mocha' method to install mocha type definitions, uncomment the following line
// import 'mocha';
describe('DateTimeWorker class', () => {
    let dateString;
    let invalidDateString;
    let invalidDateWithWrongMonthString;
    let invalidDateWithWrongDayString;
    let invalidDateWithWrongDay;
    let invalidDateWithWrongMonth;
    let date;
    let invalidDate;
    before(() => {
        invalidDateString = 'foo';
        invalidDate = new Date(invalidDateString);
        dateString = '01.01.2018';
        date = new Date(dateString);
        invalidDateWithWrongDayString = '01.32.2018';
        invalidDateWithWrongDay = new Date(invalidDateWithWrongDayString);
        invalidDateWithWrongMonthString = '01.32.2018';
        invalidDateWithWrongMonth = new Date(invalidDateWithWrongMonthString);
    });
    describe('isValidDate function', () => {
        it('should return false', () => {
            const result = date_time_worker_1.DateTimeWorker.isValidDate(invalidDate);
            chai_1.expect(result).to.equal(false);
        });
        it('shoud return true', () => {
            const result = date_time_worker_1.DateTimeWorker.isValidDate(date);
            chai_1.expect(result).to.equal(true);
        });
    });
    describe('convertStringDateToDateObject function', () => {
        it('should return validDate', () => {
            const result = date_time_worker_1.DateTimeWorker.isValidDate(date);
            chai_1.expect(result).to.equal(true);
        });
        it('should return invalid date because wrong month', () => {
            const result = date_time_worker_1.DateTimeWorker.isValidDate(invalidDateWithWrongMonth);
            chai_1.expect(result).to.equal(false);
        });
        it('should return invalid date because wrong day', () => {
            const result = date_time_worker_1.DateTimeWorker.isValidDate(invalidDateWithWrongDay);
            chai_1.expect(result).to.equal(false);
        });
    });
});
//# sourceMappingURL=date-time.worker.spec.js.map