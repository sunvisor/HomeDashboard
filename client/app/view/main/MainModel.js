/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('HomeDashboard.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.main',

    WEATHER_URI : '../weather',
    GOMI        : [2, 5],
    TIME_FORMAT : 'H:i',
    CALENDAR_URI: '../calendar',
    //CALENDAR_URI: '../calendar/2018/11/29',

    readWeather() {
        Ext.Ajax.request({
            url: this.WEATHER_URI
        }).then(ret => {
            const view    = this.getView(),
                  weather = Ext.decode(ret.responseText);

            this.set('weather', weather);
            view.fireEvent('loadWeather', view, weather);
        });
    },

    readCalendar() {
        Ext.Ajax.request({
            url: this.CALENDAR_URI
        }).then(ret => {
            const view     = this.getView(),
                  today    = new Date(),
                  calendar = Ext.decode(ret.responseText);

            let data = [];
            if (this.GOMI.indexOf(today.getDay()) !== -1) {
                data.push({
                    summary: '燃えるゴミ',
                    calendarId: 3
                })
            }
            for (let i = 0; i < calendar.length; i++) {
                data.push({
                    time      : this.getTime(calendar[i]),
                    summary   : calendar[i].summary,
                    calendarId: calendar[i].calendarId
                });
            }
            this.set('calendar', data);
            view.fireEvent('loadCalendar', view, data);
        });
    },

    getTime(calendar) {
        if (calendar.startDate) {
            switch (calendar.calendarId) {
                case 4:
                    return '資源ゴミ';
                case 5:
                    return '';
                default:
                    return ''
            }
        }
        if (!calendar.startTime) {
            return '';
        }
        const startTime = new Date(calendar.startTime);
        const endTime = new Date(calendar.endTime || calendar.startTime);

        return this.timeToStr(startTime) + ' - ' + this.timeToStr(endTime);
    },

    timeToStr(time) {
        return Ext.Date.format(time, this.TIME_FORMAT);
    }

});
