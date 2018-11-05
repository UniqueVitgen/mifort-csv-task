"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CsvUser_1 = require("../classes/CsvUser");
const config_1 = require("../config/config");
const date_time_worker_1 = require("./date-time.worker");
class CsvUserWorker {
    static parseObjectToCsvUser(object) {
        let csvUser = new CsvUser_1.CsvUser();
        if (object)
            csvUser["Date of registration"] = date_time_worker_1.DateTimeWorker.convertStringDateToDateObject(object["Date of registration"]);
        console.log(csvUser["Date of registration"]);
        csvUser.Mail = object.Mail;
        csvUser.Name = object.Name;
        csvUser.Phone = object.Phone;
        csvUser.Surname = object.Surname;
        return csvUser;
    }
    static checkIfAllFieldFilled(object) {
        for (let prop of config_1.csvConfig.csv) {
            if (object[prop.name] == null) {
                return false;
            }
        }
        return true;
    }
    static checkIfAllFieldFilledInArray(objectList) {
        for (let object of objectList) {
            if (!this.checkIfAllFieldFilled(object)) {
                return false;
            }
        }
        return true;
    }
    static convertToDatabaseObject(csvUser) {
        let databaseUser = Object.assign({}, csvUser);
        if (databaseUser["Date of registration"]) {
            databaseUser["Date of registration"] = csvUser["Date of registration"].toISOString().slice(0, 10);
        }
        return databaseUser;
    }
    static convertCsvUserListToDatabaseUserList(csvUserList) {
        return csvUserList.map((csvUser => {
            return this.convertToDatabaseObject(csvUser);
        }));
    }
}
exports.CsvUserWorker = CsvUserWorker;
//# sourceMappingURL=csv-user.worker.js.map