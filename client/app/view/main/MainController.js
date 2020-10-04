/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 */
Ext.define('HomeDashboard.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    init() {
        this.getViewModel().readWeather();
        this.loadCalendar();

        // 定期的にデータ読み込み
        Ext.interval(() => {
            const now = new Date(),
                  hour = now.getHours();

            this.getViewModel().readWeather();
            if (hour === 0) {
                this.selectToday();
            } else {
                this.loadCalendar();
            }
        }, 30 * 60 * 1000);
    },

    WEEK_NAMES: '日月火水木金土',
    WEEK_CLASS: ['sunday', '', '', '', '', '', 'saturday'],

    loadCalendar() {
        const comp = this.lookup('calendar');
        comp.mask({
            xtype: 'loadmask',
            message: 'Loading...'
        });
        this.getViewModel().readCalendar();
    },

    onLoadWeather: function (view, weather) {
        let hourly = [];

        for (let i = 0; i < 14; i++) {
            if (((i + 1) % 2) === 0) {
                hourly.push(weather.hourly.data[i]);
            }
        }
        const today = new Date();

        view.down('weather').setData({
            month            : today.getMonth() + 1,
            day              : today.getDate(),
            dayOfTheWeek     : this.WEEK_NAMES[today.getDay()],
            week             : this.WEEK_CLASS[today.getDay()],
            temperature      : weather.currently.temperature,
            icon             : weather.currently.icon,
            temperatureLow   : weather.daily.data[0].temperatureLow,
            temperatureHigh  : weather.daily.data[0].temperatureHigh,
            precipIntensity  : weather.daily.data[0].precipIntensity,
            precipProbability: weather.daily.data[0].precipProbability,
            windSpeed        : weather.currently.windSpeed,
            pressure         : weather.currently.pressure,
            hourly
        });
    },

    onLoadCalendar: function (view, calendar) {
        const comp = this.lookup('calendar');
        comp.unmask();
        comp.setData(calendar);
    },

    onToday: function () {
        this.selectToday();
    },
    onPervDate: function () {
        this.selectDate(-1);
    },
    onNextDate: function () {
        this.selectDate(1);
    },

    selectToday() {
        const vm = this.getViewModel();

        vm.set('date', new Date());
        vm.set('title', '今日の予定')
        this.loadCalendar();
    },

    selectDate(interval) {
        const vm = this.getViewModel(),
              date = Ext.Date.add(vm.get('date'), Ext.Date.DAY, interval);

        vm.set('date', date);
        vm.set('title', Ext.Date.format(date, 'm/d') + 'の予定')
        this.loadCalendar();
    },

});
