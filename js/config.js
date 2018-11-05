"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validator_worker_1 = require("./workers/validator.worker");
const StaticValidatorWorker = validator_worker_1.ValidatorWorker;
exports.csvConfig = {
    csv: [
        {
            name: 'Name',
            type: 'string',
            validators: []
        },
        {
            name: 'Mail',
            type: 'string',
            validators: [
                StaticValidatorWorker.regExp(/^[ ]*[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}[ ]*$/)
            ]
        },
        {
            name: 'Surname',
            type: 'string',
            validators: []
        },
        {
            name: 'Phone',
            type: 'string',
            validators: []
        },
        {
            name: 'Date of registration',
            type: 'string',
            validators: []
        }
    ]
};
//# sourceMappingURL=config.js.map