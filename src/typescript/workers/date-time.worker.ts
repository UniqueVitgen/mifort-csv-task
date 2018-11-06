export class DateTimeWorker {
  static formatDate(date: Date) {
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    // return day + ' ' + monthNames[monthIndex] + ' ' + year;
    return day + '/' + (monthIndex + 1) + '/' + year;
  }

  static compareDates(dateA: any, dateB: any) {
    dateA = new Date(dateA);
    dateB = new Date(dateB);
    return dateA == dateB;
  }

  static isValidDate(date: Date) {
    //console.log('isNan', date.getTime());
    return !isNaN(date.getTime());
  }

  static convertStringDateToDateObject(dateString: string): any {
    if (dateString) {
      dateString = dateString.replace(/[/-]/g, '.');
      // console.log('date', dateString, new Date(dateString));
      return new Date(dateString);
    }
    // else {
    // throw Error('what is it');
    // }
  }
}