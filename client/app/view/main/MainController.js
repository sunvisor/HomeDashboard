/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 */
Ext.define('HomeDashboard.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    init() {
        this.getViewModel().readWeather();
        this.getViewModel().readCalendar();

        // 定期的にデータ読み込み
        Ext.interval(() => {
            this.getViewModel().readWeather();
            this.getViewModel().readCalendar();
        }, 30 * 60 * 1000);
    },

    WEEK_NAMES: '日月火水木金土',

    onLoadWeather: function (view, weather) {
        let hourly = [];

        for(let i=0; i < 24; i++) {
            if (((i + 1)%4) === 0) {
                hourly.push(weather.hourly.data[i]);
            }
        }
        const today = new Date();

        view.down('weather').setData({
            month: today.getMonth() + 1,
            day: today.getDate(),
            dayOfTheWeek: this.WEEK_NAMES[today.getDay()],
            temperature: weather.currently.temperature,
            icon: weather.currently.icon,
            temperatureLow: weather.daily.data[0].temperatureLow,
            temperatureHigh: weather.daily.data[0].temperatureHigh,
            precipIntensity: weather.daily.data[0].precipIntensity,
            precipProbability: weather.daily.data[0].precipProbability,
            windSpeed: weather.currently.windSpeed,
            pressure: weather.currently.pressure,
            hourly
        });
    },

    onLoadCalendar: function (view, calendar) {
        view.down('calendar').setData(calendar);
    }
});
