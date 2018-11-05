import { ParsedObject } from "../classes/ParsedObject";
import { ValidateProperty } from "../classes/ValidateProperty";
import { CsvUserWorker } from "./csv-user.worker";
import { ParsedObjectWorker } from "./parsed-object.worker";
import { csvConfig } from "../config/config";
import { DateTimeWorker } from "./date-time.worker";

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
      parsedObject.errorList.push('invalid type: ' + 'date');
    }
    return parsedObject;
  }

   validateFieldByType(parsedObject: ParsedObject, prop: string, validateProperty: ValidateProperty) {
    if(prop == 'Date of registration') {
      parsedObject = this.validateDateTypeOfParsedObject(parsedObject);
    }
    else {
      if (!(typeof (parsedObject.object as any)[prop] == validateProperty.type)) {
        // console.log(prop, parsedObject.object[prop], typeof (parsedObject.object as any)[prop]);
        parsedObject.errorList.push('invalid type of ' + prop);
        parsedObject.isValid = false;
      }
    }
    return parsedObject;
  }

   validateFieldByValidators(parsedObject: ParsedObject, prop: string, validateProperty: ValidateProperty) {
    for (let validator of validateProperty.validators) {
      if (!validator(parsedObject.originObject[prop])) {
        parsedObject.errorList.push('invalid field: ' +  prop);
        parsedObject.isValid = false;
      }
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