var chai = require('chai');
var assert = chai.assert;
var DateFormatter = require('../src/DateFormatter')

var dateFormatter = new DateFormatter();
dateFormatter.init();

describe('DateFormatter test: ', function() {
    it('Установлена локаль по умолчанию', function() {
        assert.equal(dateFormatter.getLocale(), 'en-US');
    });

    it('Русская локаль', function() {
        dateFormatter.setLocale('ru-RU')
        assert.equal(dateFormatter.getLocale(), 'ru-RU');
    });

    it('До 2 минут', function() {
        var r = dateFormatter.format(new Date().getTime() - (60 * 1000 * 1.9)); // 2 минуты назад
        console.log('До 2 минут ',r);
        assert.equal(r, 'now');
    });

    it('До 60 минут', function() {
        var r = dateFormatter.format(new Date().getTime() - (60 * 1000 * 35)); // 45 минут назад
        console.log('До 60 минут ', r);
        assert.include(r, 'minutes ago');
    });

    it('До 10 часов', function() {
        var r = dateFormatter.format(new Date().getTime() - (60 * 1000 * 60 * 5)); // 5 часов назад
        console.log('До 10 часов ',r);
        assert.include(r, 'hour ago');
    });

    it('Больше 10 часов', function() {
        var r = dateFormatter.format(new Date().getTime() - (60 * 1000 * 60 * 12)); // 12 часов назад
        console.log('Больше 10 часов ',r);
        assert.include(r, 'Today');
    });

    it('Очень давно', function() {
        var r = dateFormatter.format(new Date('08/15/2016 12:00').getTime());
        console.log('Очень давно ',r);
        assert.equal(r, 'Aug 15, 2016 12:00');
    });
});
