# Typescript task1 (CSV-parse)
This is home for the csv-parser example application in typescript. ![My pic](https://images.ctfassets.net/3n0fku9d0jjr/1caC38kuhK8WusWKQGIeAO/6a35483a56960b0ff258e5c6acb9c0d7/csv-autofetch.svg)

##Where is typescript
* the main file of typescript is located in root directory and called `index.ts`
* others files are located in src/typescript directory
* test files located in src/test

## Tags
`mysql` `typescript` `node.js`

##  Getting started
Download dependencies for this project by typing `npm install`, after configure application in file `config\config.ts` then run ant test.

##  Run 
To run application typing `npm start`

##  Test
To test applicaiton typing `npm test`

##  Configuration
To configure change following code in `config\config.ts`:

* database connection
```
export const dbConfig = {
  host: '127.0.0.1',
  user: 'root', //personal
  password: 'root', //personal
  database: 'mifort_cvs_task',
  table: 'csv_rows'
}
```
* to change default line and collumn delimeter
```
export const csvFileConfig = {
  lineDelimeter: '\n',
  columnDelimeter: '\,'
}
```
* csv parse settings
```
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
```