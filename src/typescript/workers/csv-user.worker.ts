import { csvConfig } from "../config/config";
import { DateTimeWorker } from "./date-time.worker";
import { CsvUser } from "../classes/csv-user";

export class CsvUserWorker {
  static parseObjectToCsvUser(object: any): CsvUser {
    let csvUser: CsvUser = new CsvUser();
    if(object)
    csvUser["Date of registration"] = DateTimeWorker.convertStringDateToDateObject(object["Date of registration"]);
    // console.log(csvUser["Date of registration"]);
    csvUser.Mail = object.Mail;
    csvUser.Name = object.Name;
    csvUser.Phone = object.Phone;
    csvUser.Surname = object.Surname;
    return csvUser;
  }

  static checkIfAllFieldFilled(object: CsvUser) {
    for(let prop of csvConfig.csv) {
      if((object as any)[prop.name] == null) {
        return false;
      }
    }
    return true;
  }

  static checkIfAllFieldFilledInArray(objectList: any[]) {
    for(let object of objectList) {
      if(!this.checkIfAllFieldFilled(object)) {
        return false;
      }
    }
    return true;
  }

  static convertToDatabaseObject(csvUser: CsvUser): any {
    let databaseUser: any = Object.assign({}, csvUser);
    if(databaseUser["Date of registration"]) {
      databaseUser["Date of registration"] = new Date(databaseUser["Date of registration"]);
      databaseUser["Date of registration"] = databaseUser["Date of registration"].toISOString().slice(0, 10);  
    } return databaseUser;
  }

  static convertCsvUserListToDatabaseUserList(csvUserList: CsvUser[]) {
    return csvUserList.map((csvUser => {
      return this.convertToDatabaseObject(csvUser);
    }))
  }
}