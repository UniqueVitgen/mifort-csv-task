import { ValidateProperty } from "../classes/ValidateProperty";
import { DatabaseProperty } from "../classes/DatabaseProperty";

export const csvConfig = {
  csv:<Array<ValidateProperty>> [

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
  db:<Array<DatabaseProperty>> [

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

function length(min: number, max: number): (Email: string) => boolean {
  return function (Email: string): boolean {
    return Email.length >= min && Email.length <= max;
  }
}

function regExp(pattern: RegExp): (Email: string) => boolean {
  return function (Email: string): boolean {
    return Email.match(pattern) != null;
  }
}