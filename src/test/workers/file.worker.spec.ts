import { FileWorker } from '../../typescript/workers/file.worker';
describe('FileWorker', () => {

  describe('writeFile method', () => {
    it('should resolve', (done) => {
      const filename = 'src/resources/csv/text.txt';
      const text = 'text';
      FileWorker.writeFile(filename, text).then((resolve) => {
        FileWorker.exists(filename).then((resExists) => {
          FileWorker.deleteFile(filename);
          done();
        })
      })
    })
  });
})