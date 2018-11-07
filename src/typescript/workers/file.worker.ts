
import fs from 'fs';


export class FileWorker {
  static deleteFile(filePath: string) {
    // return new Promise((resolve, reject) => {
      fs.unlinkSync(filePath);
    // } )
  }

  static exists(filePath: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      fs.exists(filePath, (isExists) => {
        resolve(isExists);
      })
    })
  }

  static writeFile(filePath: string, text: string):Promise<any>{
    return new Promise((resolve, reject) => {
      fs.writeFile(filePath, text, (err) => {
        if (err) {console.error(err); reject(err)}
        else {
          resolve();
        }
      });
    })
  }
}