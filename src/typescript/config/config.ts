import { ValidateProperty } from "../classes/validate-property";
import { DatabaseProperty } from "../classes/database-property";
import { ErrorObject } from "../classes/error-object";

export const csvConfig = {
  csv: <Array<ValidateProperty>>[

    {
      name: 'Name',
      type: 'string',
      validators: [
        regExp(/(^[A-Za-z]+$)|(^[А-Яа-я]+$)/)
      ]
    },
    {
      name: 'Mail',
      type: 'string',
      validators: [
        regExp(/^[ ]*[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}[ ]*$/)
        // StaticValidatorWorker.regExp(/^[ ]*[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}[ ]*$/)
      ]
    },
    {
      name: 'Surname',
      type: 'string',
      validators: [
        regExp(/(^[A-Za-z]+$)|(^[А-Яа-я]+$)/)]
    },
    {
      name: 'Phone',
      type: 'string',
      validators: [
        regExp(/^\+375[\s-]*\(?(17|29|33|44)\)?[\s-]*(?:\d[^\d\r\na-zA-ZА-Яа-я]*){7}$/)
      ]
    },
    {
      name: 'Date of registration',
      type: 'Date',
      validators: []
    }
  ],
  db: <Array<DatabaseProperty>>[

    {
      name: 'Name',
      type: 'varchar(255)',
    },
    {
      name: 'Mail',
      type: 'varchar(255)',
    },
    {
      name: 'Surname',
      type: 'varchar(255)',
    },
    {
      name: 'Phone',
      type: 'varchar(255)',
    },
    {
      name: 'Date of registration',
      type: 'Date',
    }
  ]
};


export const csvFileConfig = {
  lineDelimeter: '\n',
  columnDelimeter: '\,'
}

export const dbConfig = {
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'mifort_cvs_task',
  table: 'csv_rows'
}

function length(min: number, max: number): (Email: string) => string | null {
  return function (Email: string): string | null {
    if (Email.length >= min && Email.length <= max) {
      return 'length must be between ' + min + ' and ' + max;
    };
    return null;
  }
}

function regExp(pattern: RegExp): (Email: string) => string | null {
  return function (Email: string): string | null {
    if (Email.match(pattern) == null) {
      // return 'value must be like regex ' + pattern;
      return 'invalid format';
    }
    return null;
  }
}