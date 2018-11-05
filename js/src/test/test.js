"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ParsedObject_1 = require("../typescript/classes/ParsedObject");
const validator_worker_1 = require("../typescript/workers/validator.worker");
function main() {
    let sourceObject;
    let sourceObjectList;
    let invalidSourceObjectWrongEmail;
    let invalidSourceObjectWrongDate;
    let validatorWorker;
    let parsedObject;
    let invalidParsedObject;
    let invalidParsedObjectWrongDate;
    validatorWorker = new validator_worker_1.ValidatorWorker();
    sourceObject = {
        Name: 'Dima',
        Surname: 'Dmitriev',
        Mail: 'dima@mail.ru',
        'Date of registration': '02.05.2016',
        Phone: '+375 29 3526547'
    };
    invalidSourceObjectWrongEmail = {
        Name: 'Dima',
        Surname: 'Dmitriev',
        Mail: 'Dima@mail.ru',
        'Date of registration': '02.05.2016',
        Phone: '+375 29 3526547'
    };
    invalidSourceObjectWrongDate = {
        Name: 'Dima',
        Surname: 'Dmitriev',
        Mail: 'Dima@mail.ru',
        'Date of registration': '22.22.2016',
        Phone: '+375 29 3526547'
    };
    sourceObjectList = [sourceObject];
    parsedObject = new ParsedObject_1.ParsedObject(sourceObject);
    invalidParsedObject = new ParsedObject_1.ParsedObject(invalidSourceObjectWrongEmail);
    invalidParsedObjectWrongDate = new ParsedObject_1.ParsedObject(invalidSourceObjectWrongDate);
    let testParsedObject = validatorWorker.validateFieldListByObject(invalidSourceObjectWrongDate);
    let result = testParsedObject.errorList.length == 1;
    console.log(testParsedObject);
    // expect(result).to.equal(true);
    // ParsedObjectWorker.getObjectListFromParsedObjectList()
}
main();
//# sourceMappingURL=test.js.map