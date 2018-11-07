import { parse } from "path";
import { ParsedObject } from "../classes/parsed-object";

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
    // console.log('parsedObject', parsedObjectList);
    let validParsedObjectList = this.getValidParsedObjectListFromParsedObjectList(parsedObjectList);
    return this.getObjectListFromParsedObjectList(validParsedObjectList);
  }

  static getInvalidParsedObjectListFromParsedObjectList(parsedObjectList: ParsedObject[]): ParsedObject[] {
    return parsedObjectList.filter((parsedObject: ParsedObject) => {
      return !parsedObject.isValid;
    })
  }

  static getInvalidObjectListFromParsedObjectList(parsedObjectList: ParsedObject[]): Object[] { 
    const invalidParsedObjectList = this.getInvalidParsedObjectListFromParsedObjectList(parsedObjectList);
    return this.getObjectListFromParsedObjectList(invalidParsedObjectList);
  }

  static getErrorListString(parsedObject: ParsedObject, index: number): string {
    const errorList = parsedObject.errorList;
    let text = "row:" + index + "\n";;
    for(let error of errorList) {
      text += "\t" + error.property + ": " + error.message + ';\n';
    }
    return text;
  }

  static getErrorListFromParsedObjectList(parsedObjectList: ParsedObject[]): string {
    let text = "";
    parsedObjectList.forEach((parsedObject, index) => {
      {
        text += this.getErrorListString(parsedObject, index);
      }
    }) 
    return text;
  }
}