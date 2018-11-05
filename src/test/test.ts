import { ParsedObject } from "../typescript/classes/ParsedObject";
import { CsvUser } from "../typescript/classes/CsvUser";
import { CsvUserWorker } from "../typescript/workers/csv-user.worker";
import { ParsedObjectWorker } from "../typescript/workers/parsed-object.worker";
import { DateTimeWorker } from "../typescript/workers/date-time.worker";
import { ValidatorWorker } from "../typescript/workers/validator.worker";
import { csvConfig } from "../typescript/config/config";

function main() {
  let sourceObject: any;
  let sourceObjectList: any;
  let invalidSourceObjectWrongEmail: any;
  let invalidSourceObjectWrongDate: any;
  let validatorWorker: ValidatorWorker;
  let parsedObject: ParsedObject;
  let invalidParsedObject: ParsedObject;
  let invalidParsedObjectWrongDate: ParsedObject;
  validatorWorker = new ValidatorWorker();
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

  }
  sourceObjectList = [sourceObject];
  parsedObject = new ParsedObject(sourceObject);
  invalidParsedObject = new ParsedObject(invalidSourceObjectWrongEmail);
  invalidParsedObjectWrongDate = new ParsedObject(invalidSourceObjectWrongDate);
  let testParsedObject = validatorWorker.validateFieldListByObject(invalidSourceObjectWrongDate);
  let result = testParsedObject.errorList.length == 1;
  console.log(testParsedObject);
  // expect(result).to.equal(true);
  // ParsedObjectWorker.getObjectListFromParsedObjectList()

}

main();