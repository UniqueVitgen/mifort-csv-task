import { ErrorObject } from "../classes/error-object";

export class ErrorObjectWorker {
  static generateErrorObjectByType(validType: string, invalidType: string,prop: string): ErrorObject {
    return new ErrorObject("invalid type: expected " + validType + ', real: ' + invalidType, prop);
  }
}