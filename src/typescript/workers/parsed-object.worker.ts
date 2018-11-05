import { ParsedObject } from "../classes/ParsedObject";
import { parse } from "path";

export class ParsedObjectWorker {

  static getObjectListFromParsedObjectList(parsedObjectList: ParsedObject[]): any[] {
    return parsedObjectList.map((parsedObject) => {return parsedObject.originObject;})
  }

  static getValidParsedObjectListFromParsedObjectList(parsedObjectList: ParsedObject[]): ParsedObject[] {
    return parsedObjectList.filter((parsedObject: ParsedObject) => {
      return parsedObject.isValid;
    })
  }

  static getValidObjectListFromParsedObjectList(parsedObjectList: ParsedObject[]): Object[] {
    console.log('parsedObject', parsedObjectList);
    let validParsedObjectList = this.getValidParsedObjectListFromParsedObjectList(parsedObjectList);
    return this.getObjectListFromParsedObjectList(validParsedObjectList);
  }

  static getInvalidParsedObjectListFromParsedObjectList(parsedObjectList: ParsedObject[]): ParsedObject[] {
    return parsedObjectList.filter((parsedObject: ParsedObject) => {
      return !parsedObject.isValid;
    })
  }

  static getInvalidObjectListFromParsedObjectList(parsedObjectList: ParsedObject[]): Object[] { 
    let invalidParsedObjectList = this.getInvalidParsedObjectListFromParsedObjectList(parsedObjectList);
    return this.getObjectListFromParsedObjectList(invalidParsedObjectList);
  }
}