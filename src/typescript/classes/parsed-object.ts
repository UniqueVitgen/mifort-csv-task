import { DateTimeWorker } from "../workers/date-time.worker";
import { CsvUser } from "./csv-user";
import { ErrorObject } from "./error-object";

export class ParsedObject {

  isValid: boolean = true;
  errorList: ErrorObject[] = [];
  object!: CsvUser;
  originObject: any;
  
  constructor(obj: CsvUser) {
    // obj["Date of registration"] = new Date(obj["Date of registration"]);
    this.assignObjectToCsvUser(obj);
  }

  private assignObjectToCsvUser(obj: any) {
    this.object = Object.assign({}, obj);
    let date = new Date(obj["Date of registration"]);
    let dateString = date.toString();
    if(this.object["Date of registration"]) {
      this.object["Date of registration"] = DateTimeWorker.convertStringDateToDateObject(dateString);
    }
    this.originObject = Object.assign({}, obj);
    // this.originObject["Date of registration"] = DateTimeWorker.formatDate(date);
  }
}