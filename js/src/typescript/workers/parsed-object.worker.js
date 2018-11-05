"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ParsedObjectWorker {
    static getObjectListFromParsedObjectList(parsedObjectList) {
        return parsedObjectList.map((parsedObject) => { return parsedObject.originObject; });
    }
    static getValidParsedObjectListFromParsedObjectList(parsedObjectList) {
        return parsedObjectList.filter((parsedObject) => {
            return parsedObject.isValid;
        });
    }
    static getValidObjectListFromParsedObjectList(parsedObjectList) {
        console.log('parsedObject', parsedObjectList);
        let validParsedObjectList = this.getValidParsedObjectListFromParsedObjectList(parsedObjectList);
        return this.getObjectListFromParsedObjectList(validParsedObjectList);
    }
    static getInvalidParsedObjectListFromParsedObjectList(parsedObjectList) {
        return parsedObjectList.filter((parsedObject) => {
            return !parsedObject.isValid;
        });
    }
    static getInvalidObjectListFromParsedObjectList(parsedObjectList) {
        let invalidParsedObjectList = this.getInvalidParsedObjectListFromParsedObjectList(parsedObjectList);
        return this.getObjectListFromParsedObjectList(invalidParsedObjectList);
    }
}
exports.ParsedObjectWorker = ParsedObjectWorker;
//# sourceMappingURL=parsed-object.worker.js.map