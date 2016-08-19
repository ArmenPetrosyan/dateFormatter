/**
*   DateFormatter for TemplateMonster v.1.0
*   Модуль позволяет форматировать дату и время с учетом локали согласно
*   корпоративным стандартам:
*   https://www.dropbox.com/sh/ijpvdcd9wd58q3m/AADqh4iY_sNONbUaCuLUrXJIa/Time-Formats.pdf?dl=0
*/

var moment = require('moment');

function DateFormatter(locale){
    this._locale  = locale || 'en-US';
    this._moment  = moment;
    this.units = {
        MINUTE  : 60 * 1000,
        HOUR    : 60 * 1000 * 60,
        DAY     : 60 * 1000 * 60 * 24
    };
}

DateFormatter.prototype.init = function () {
    this._moment.locale(this._locale);
};

DateFormatter.prototype.getLocale = function () {
    return this._locale;
};

DateFormatter.prototype.setLocale = function (locale) {
    this._locale = locale;
};

/**
 * Форматируем время согласно интервалам по гайду
 * @param timestamp
 * @param settings
 * @returns {string} отформатированное время
 */
DateFormatter.prototype.format = function (timestamp) {

    var time        = new Date(timestamp),
        average     = new Date() - timestamp,
        dateString  = '';

    if(average < this.units.MINUTE * 2){
        dateString = this._less2minutes();
    } else if(average < this.units.HOUR) {
        dateString = this._less60minutes(time);
    } else if(average < this.units.HOUR * 10) {
        dateString = this._less10hours(time);
    } else if(average < this.units.DAY * 2) {
        dateString = this._more10hours(time);
    } else {
        dateString = this._fullDateTime(time);
    }

    return dateString;
};

DateFormatter.prototype._less2minutes = function () {
    return 'now';
};

DateFormatter.prototype._less60minutes = function (time) {
    return this._moment(time).fromNow();
};

DateFormatter.prototype._less10hours = function (time) {
    return this._moment(time).fromNow();
};

DateFormatter.prototype._more10hours = function (time) {
    return this._moment(time).calendar(null, {
        sameDay: '[Today at] H:mm',
        lastDay: '[Yesterday at] H:mm'
    });
};

DateFormatter.prototype._fullDateTime = function (time) {
    return this._moment(time).format('MMM DD, YYYY H:mm');
};

module.exports = DateFormatter;
