import { ValidateProperty } from "../classes/validate-property";
import { CsvUserWorker } from "./csv-user.worker";
import { ParsedObjectWorker } from "./parsed-object.worker";
import { csvConfig } from "../config/config";
import { DateTimeWorker } from "./date-time.worker";
import { ParsedObject } from "../classes/parsed-object";
import { ErrorObject } from "../classes/error-object";
import { ErrorObjectWorker } from "./error-object.worker";

export class ValidatorWorker {

   validateObject(object: any): ParsedObject {
    return this.validateFieldListByObject(object);
  }

   validateField(parsedObject: ParsedObject, prop: string, validateProperty: ValidateProperty): ParsedObject {
    parsedObject = this.validateFieldByType(parsedObject, prop, validateProperty);
    parsedObject = this.validateFieldByValidators(parsedObject, prop, validateProperty);
    return parsedObject;
  }
  
  validateDateTypeOfParsedObject(parsedObject: ParsedObject): ParsedObject {
    if(!DateTimeWorker.isValidDate(parsedObject.object["Date of registration"])) {
      parsedObject.isValid = false;
      const errorObject = new ErrorObject("invalid format of date", "Date of registration");
      parsedObject.errorList.push(errorObject);
    }
    return parsedObject;
  }

   validateFieldByType(parsedObject: ParsedObject, prop: string, validateProperty: ValidateProperty) {
    if(prop == 'Date of registration') {
      parsedObject = this.validateDateTypeOfParsedObject(parsedObject);
    }
    else {
      let expectedType = validateProperty.type;
      let resultType = typeof (parsedObject.object as any)[prop];
      if (expectedType != resultType) {
        // console.log(prop, parsedObject.object[prop], typeof (parsedObject.object as any)[prop]);
        parsedObject.errorList.push(ErrorObjectWorker.generateErrorObjectByType(expectedType, resultType, prop));
        parsedObject.isValid = false;
      }
    }
    return parsedObject;
  }

   validateFieldByValidators(parsedObject: ParsedObject, prop: string, validateProperty: ValidateProperty) {
    for (let validator of validateProperty.validators) {
      // if(validateProperty.name == prop) {
        const message = validator(parsedObject.originObject[prop]);
        const errorObject = new ErrorObject(message, prop);
        // console.log(parsedObject.originObject[prop], errorObject);
        if (message) {
          parsedObject.errorList.push(errorObject);
          parsedObject.isValid = false;
        }
      // }
    }
    return parsedObject;

  }

   validateFieldList(parsedObject: ParsedObject) {
    for (let prop in parsedObject.originObject) {
      for (let validateProperty of csvConfig.csv) {
        if (prop == validateProperty.name) {
          parsedObject = this.validateField(parsedObject, prop, validateProperty);
        }
      }
    }
    return parsedObject;
  }

   validateFieldListByObject(object: any) {
    let parsedObject = new ParsedObject(object);
    // console.log(parsedObject);
    return this.validateFieldList(parsedObject);
  }

   validateObjectList(objectList: any[]): ParsedObject[] {
    return objectList.map(object => {
      return this.validateObject(object);
    });
  }
}