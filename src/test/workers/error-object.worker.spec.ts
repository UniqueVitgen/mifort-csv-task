import { expect } from "chai";
import { ErrorObjectWorker } from "../../typescript/workers/error-object.worker";

describe('ErrorObjectWorker', () => {

  beforeEach(() => {

  });


  describe('generateErrorObjectByType', () => {
    it('should return expectedTrue', () => {
      const testString = ErrorObjectWorker.generateErrorObjectByType('validType', 'invalidType', 'prop').message;
      const expectedString = "invalid type: expected validType, real: invalidType";
      const result = expectedString == testString;
      expect(result).to.equal(true);
    })
  })
})