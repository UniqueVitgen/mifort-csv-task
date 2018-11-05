"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const ParsedObject_1 = require("../classes/ParsedObject");
class ValidatorWorker {
    static validateLength(min, max) {
        return function (Email) {
            return Email.length >= min && Email.length <= max;
        };
    }
    static regExp(pattern) {
        return function (Email) {
            return Email.match(pattern) != null;
        };
    }
    static validateObject(object) {
        return this.validateFieldListByObject(object);
    }
    static validateField(parsedObject, prop, validateProperty) {
        parsedObject = this.validateFieldByType(parsedObject, prop, validateProperty);
        parsedObject = this.validateFieldByValidators(parsedObject, prop, validateProperty);
        return parsedObject;
    }
    static validateFieldByType(parsedObject, prop, validateProperty) {
        // console.log(parsedObject.originObject[prop],typeof parsedObject.originObject[prop])
        if (!(typeof parsedObject.originObject[prop] == validateProperty.type)) {
            parsedObject.errorList.push('invalid type');
            parsedObject.isValid = false;
        }
        return parsedObject;
    }
    static validateFieldByValidators(parsedObject, prop, validateProperty) {
        for (let validator of validateProperty.validators) {
            if (!validator(parsedObject.originObject[prop])) {
                parsedObject.errorList.push('invalid field', prop);
                parsedObject.isValid = false;
            }
        }
        return parsedObject;
    }
    static validateFieldList(parsedObject) {
        for (let prop in parsedObject.originObject) {
            for (let validateProperty of config_1.csvConfig.csv) {
                if (prop == validateProperty.name) {
                    parsedObject = this.validateField(parsedObject, prop, validateProperty);
                }
            }
        }
        return parsedObject;
    }
    static validateFieldListByObject(object) {
        let parsedObject = new ParsedObject_1.ParsedObject(object);
        return this.validateFieldList(parsedObject);
    }
    static validateObjectList(objectList) {
        return objectList.map(object => {
            return this.validateObject(object);
        });
    }
}
exports.ValidatorWorker = ValidatorWorker;
//# sourceMappingURL=validator.worker.js.map