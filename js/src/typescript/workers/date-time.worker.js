"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DateTimeWorker {
    static formatDate(date) {
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
    static compareDates(dateA, dateB) {
        dateA = new Date(dateA);
        dateB = new Date(dateB);
        return dateA == dateB;
    }
    static isValidDate(date) {
        //console.log('isNan', date.getTime());
        return !isNaN(date.getTime());
    }
    static convertStringDateToDateObject(dateString) {
        if (dateString) {
            dateString = dateString.replace(/[/-]/g, '.');
            console.log('date', dateString, new Date(dateString));
            return new Date(dateString);
        }
        // else {
        // throw Error('what is it');
        // }
    }
}
exports.DateTimeWorker = DateTimeWorker;
//# sourceMappingURL=date-time.worker.js.map