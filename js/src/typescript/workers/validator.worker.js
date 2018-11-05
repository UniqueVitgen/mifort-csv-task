"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ParsedObject_1 = require("../classes/ParsedObject");
const config_1 = require("../config/config");
const date_time_worker_1 = require("./date-time.worker");
class ValidatorWorker {
    validateObject(object) {
        return this.validateFieldListByObject(object);
    }
    validateField(parsedObject, prop, validateProperty) {
        parsedObject = this.validateFieldByType(parsedObject, prop, validateProperty);
        parsedObject = this.validateFieldByValidators(parsedObject, prop, validateProperty);
        return parsedObject;
    }
    validateDateTypeOfParsedObject(parsedObject) {
        if (!date_time_worker_1.DateTimeWorker.isValidDate(parsedObject.object["Date of registration"])) {
            parsedObject.isValid = false;
            parsedObject.errorList.push('invalid type: ' + 'date');
        }
        return parsedObject;
    }
    validateFieldByType(parsedObject, prop, validateProperty) {
        if (prop == 'Date of registration') {
            parsedObject = this.validateDateTypeOfParsedObject(parsedObject);
        }
        else {
            if (!(typeof parsedObject.object[prop] == validateProperty.type)) {
                // console.log(prop, parsedObject.object[prop], typeof (parsedObject.object as any)[prop]);
                parsedObject.errorList.push('invalid type of ' + prop);
                parsedObject.isValid = false;
            }
        }
        return parsedObject;
    }
    validateFieldByValidators(parsedObject, prop, validateProperty) {
        for (let validator of validateProperty.validators) {
            if (!validator(parsedObject.originObject[prop])) {
                parsedObject.errorList.push('invalid field: ' + prop);
                parsedObject.isValid = false;
            }
        }
        return parsedObject;
    }
    validateFieldList(parsedObject) {
        for (let prop in parsedObject.originObject) {
            for (let validateProperty of config_1.csvConfig.csv) {
                if (prop == validateProperty.name) {
                    parsedObject = this.validateField(parsedObject, prop, validateProperty);
                }
            }
        }
        return parsedObject;
    }
    validateFieldListByObject(object) {
        let parsedObject = new ParsedObject_1.ParsedObject(object);
        // console.log(parsedObject);
        return this.validateFieldList(parsedObject);
    }
    validateObjectList(objectList) {
        return objectList.map(object => {
            return this.validateObject(object);
        });
    }
}
exports.ValidatorWorker = ValidatorWorker;
//# sourceMappingURL=validator.worker.js.map