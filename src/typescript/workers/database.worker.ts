import * as mysqlWorker from 'mysql';
import { DatabaseProperty } from "../classes/database-property";
import { resolve } from "dns";
import { CsvUserWorker } from "./csv-user.worker";
import { dbConfig } from '../config/config';
import { CsvUser } from '../classes/csv-user';
import { ParsedObject } from '../classes/parsed-object';

// var mysql = require('mysql');

export class DatabaseWorker {
  connection!: mysqlWorker.Connection;
  isTryConnect: boolean = false;
  constructor() {
    // this.connect();
  }

  connect(databaseName?: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.connection = mysqlWorker.createConnection({
        host: dbConfig.host,
        user: dbConfig.user,
        password: dbConfig.password,
        database: databaseName
      })
      let that = this;
      that.isTryConnect = true;
      this.connection.connect(function (err: any) {
        that.isTryConnect = false;
        if (err) { console.error(err); reject(err); }
        else resolve();
      });
    })
  }

  query(query: string, database?: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.connect(database).then(() => {
        if (this.connection.state == 'authenticated') {
          this.connection.query(query, (errQuery, resultQuery) => {
            if (errQuery) {
              console.error(errQuery);
              reject(errQuery);
            }
            else {
              this.disconect().then((res) => {
                resolve(resultQuery);
              })
            }
          })
        }
      })
    })
  }

  disconect(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.connection.state == 'authenticated') {
        try {
          this.connection.destroy();
          resolve();
        }
        catch (err) {
          console.error(err);
          reject(err);
        }
      }
    })
  }

  insertIntoTable(tablename: string, columnProperties: DatabaseProperty[], csvUserList: CsvUser[]): Promise<any> {
    return new Promise((resolve, reject) => {
      if(csvUserList.length > 0) {
        let query = this.generateInsertIntoQueryString(tablename,columnProperties, csvUserList);
        // console.log(query);
        this.query(query, dbConfig.database).then(res => {
          resolve(res);
        }).catch(errQuery => reject(errQuery));
      }
      else {
        resolve('csvUserList length = 0');
      }
    })
  }

  insertIntoTableByParsedObject(tablename: string, columnProperties: DatabaseProperty[], parsedObjectList: ParsedObject[]): Promise<any> {
    parsedObjectList = parsedObjectList.filter((parsedObject) => {
      return parsedObject.isValid;
    });
    let csvUserList = parsedObjectList.map(parsedObject => parsedObject.object);
    return this.insertIntoTable(tablename,columnProperties, csvUserList);
  }

  generateInsertIntoQueryString(tablename: string,
    columnProperties: DatabaseProperty[], csvUserList: CsvUser[]): string {
    let query = 'INSERT INTO ' + tablename;
    query += '\n(';
    columnProperties.forEach((property, index) => {
      query += '\`' + property.name + '\`';
      if (index != columnProperties.length - 1) {
        query += ',';
      }
    });
    query += ')\nVALUES';
    let databaseUserList = CsvUserWorker.convertCsvUserListToDatabaseUserList(csvUserList);
    databaseUserList.forEach((csvUser: any, csvUserIndex) => {
      columnProperties.forEach((property, Propertyindex) => {
        if (Propertyindex == 0) {
          query += '(';
        }
        query += "\'" + csvUser[property.name] + "\'";
        if (Propertyindex == columnProperties.length - 1) {
          query += ')';
        }
        else {
          query +=',';
        }
      });
      if(csvUserIndex != databaseUserList.length -1) {
        query += "\,";
      }
      query += '\n';
    });
    // console.log('query', query);
    return query;
  }

  // generateInsertIntoQueryString(tablename: string,
  //   columnProperties: DatabaseProperty[], csvUserList: CsvUser[]): string {
  //   let query = 'INSERT INTO ' + tablename;
  //   query += '\n(';
  //   columnProperties.forEach((property, index) => {
  //     query += '\`' + property.name + '\`';
  //     if (index != columnProperties.length - 1) {
  //       query += ',';
  //     }
  //   });
  //   query += ')\nVALUES';
  //   let databaseUserList = CsvUserWorker.convertCsvUserListToDatabaseUserList(csvUserList);
  //   databaseUserList.forEach((csvUser: any, csvUserIndex) => {
  //     columnProperties.forEach((property, Propertyindex) => {
  //       if (Propertyindex == 0) {
  //         query += '(';
  //       }
  //       query += "\'" + csvUser[property.name] + "\'";
  //       if (Propertyindex == columnProperties.length - 1) {
  //         query += ')';
  //       }
  //       else {
  //         query +=',';
  //       }
  //     });
  //     if(csvUserIndex != databaseUserList.length -1) {
  //       query += "\,";
  //     }
  //     query += '\n';
  //   });
  //   // console.log('query', query);
  //   return query;
  // }

  createDatabaseIfNotExists(databaseName: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let that = this;
      this.query('CREATE DATABASE IF NOT EXISTS ' + databaseName + ';').then(result => {
        resolve(result);
      })
    });
  }

  dropDatabaseIfExists(databaseName: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let that = this;
      this.query('drop DATABASE IF EXISTS ' + databaseName + ';').then(result => {
        resolve(result);
      });
    })
  }

  selectObjectFromTable(table: string): Promise<CsvUser[]> {
    return new Promise((resolve, reject) => {
      let that = this;
      this.query('select * from ' + table, dbConfig.database).then(resultQuery => {
        // console.log(resultQuery);
        resolve(resultQuery);
      }, rejectQuery => reject(rejectQuery)).catch(errorQuery => {reject(errorQuery);})
    })
  }

  generateCreateTableIfNotExistsQueryString(table: string, properties: DatabaseProperty[]): string {
    let query = 'CREATE Table IF NOT EXISTS ' + table + ' (\n';
    query += '\`id\` INT NOT NULL AUTO_INCREMENT,\n';
    properties.forEach((property, index) => {
      query += "`" + property.name + "` " + property.type + ' NOT NULL';
      // if (index != properties.length - 1) {
        query += ',\n';
      // }
    });
    query += 'PRIMARY KEY (`id`)\n)';
    return query;
  }

  createTableIfNotExists(table: string, properties: DatabaseProperty[]): Promise<any> {
    return new Promise((resolve, reject) => {
      let query = this.generateCreateTableIfNotExistsQueryString(table,properties);
      this.query(query, dbConfig.database).then((res) => {
        resolve(res);
      });
    })
  }

  dropTableIfExists(table: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let query = 'drop DATABASE IF EXISTS ' + table + ';';
      this.query(query, dbConfig.database).then((res) => {
        resolve(res);
      });
    })
  }

  deleteTableIfExists(table:string, properties: DatabaseProperty[]): Promise<any> {
    return new Promise((resolve, reject) => {
      let query =  this
    })
  }
}

