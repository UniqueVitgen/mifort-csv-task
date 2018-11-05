import { CsvUser } from "./CsvUser";
import { DateTimeWorker } from "../workers/date-time.worker";

export class ParsedObject {

  isValid: boolean = true;
  errorList: string[] = [];
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
    this.originObject["Date of registration"] = DateTimeWorker.formatDate(date);
  }
}