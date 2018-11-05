import { expect } from 'chai';
import { DateTimeWorker } from '../../typescript/workers/date-time.worker';
// if you used the '@types/mocha' method to install mocha type definitions, uncomment the following line
// import 'mocha';

describe('DateTimeWorker class', () => {

  let dateString: string;
  let invalidDateString: string;
  let invalidDateWithWrongMonthString: string;
  let invalidDateWithWrongDayString: string;
  let invalidDateWithWrongDay: Date;
  let invalidDateWithWrongMonth: Date;
  let date: Date;
  let invalidDate: Date;

  before(() => {
    invalidDateString = 'foo';
    invalidDate = new Date(invalidDateString);
    dateString = '01.01.2018';
    date = new Date(dateString);
    invalidDateWithWrongDayString = '01.32.2018';
    invalidDateWithWrongDay = new Date(invalidDateWithWrongDayString);
    invalidDateWithWrongMonthString = '01.32.2018';
    invalidDateWithWrongMonth = new Date(invalidDateWithWrongMonthString);
  })

  describe('isValidDate function', () => {
    it('should return false', () => {
      const result = DateTimeWorker.isValidDate(invalidDate);
      expect(result).to.equal(false);
    });

    it('shoud return true', () => {
      const result = DateTimeWorker.isValidDate(date);
      expect(result).to.equal(true);
    })
  });

  describe('convertStringDateToDateObject function', () => {
    it('should return validDate', () => {
      const result = DateTimeWorker.isValidDate(date);
      expect(result).to.equal(true);
    });

    it('should return invalid date because wrong month', () => {
      const result = DateTimeWorker.isValidDate(invalidDateWithWrongMonth);
      expect(result).to.equal(false);
    });

    it('should return invalid date because wrong day', () => {
      const result = DateTimeWorker.isValidDate(invalidDateWithWrongDay);
      expect(result).to.equal(false);
    });
  })

})