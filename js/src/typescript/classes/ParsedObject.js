"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const date_time_worker_1 = require("../workers/date-time.worker");
class ParsedObject {
    constructor(obj) {
        this.isValid = true;
        this.errorList = [];
        // obj["Date of registration"] = new Date(obj["Date of registration"]);
        this.assignObjectToCsvUser(obj);
    }
    assignObjectToCsvUser(obj) {
        this.object = Object.assign({}, obj);
        let date = new Date(obj["Date of registration"]);
        let dateString = date.toString();
        if (this.object["Date of registration"]) {
            this.object["Date of registration"] = date_time_worker_1.DateTimeWorker.convertStringDateToDateObject(dateString);
        }
        this.originObject = Object.assign({}, obj);
        this.originObject["Date of registration"] = date_time_worker_1.DateTimeWorker.formatDate(date);
    }
}
exports.ParsedObject = ParsedObject;
//# sourceMappingURL=ParsedObject.js.map