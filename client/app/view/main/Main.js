/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting causes an instance of this class to be created and
 * added to the Viewport container.
 */
Ext.define('HomeDashboard.view.main.Main', {
    extend: 'Ext.Panel',

    xtype: 'app-main',

    requires: [
        'Ext.layout.VBox',
        'HomeDashboard.view.dashboard.Calendar',
        'HomeDashboard.view.dashboard.Weather',
        'HomeDashboard.view.main.MainController',
        'HomeDashboard.view.main.MainModel'
    ],

    controller: 'main',
    viewModel : 'main',

    defaults: {
        tab: {
            iconAlign: 'top'
        }
    },

    listeners: {
        loadWeather : 'onLoadWeather',
        loadCalendar: 'onLoadCalendar'
    },

    layout: {
        type : 'vbox',
        align: 'stretch'
    },

    items: [
        {
            xtype: 'weather',
        },
        {
            xtype    : 'calendar',
            reference: 'calendar',
            flex     : 1,
            scrollable: true,

            tools: [
                {
                    html   : '前日',
                    handler: 'onPervDate'
                },
                {
                    html   : '今日',
                    handler: 'onToday'
                },
                {
                    html   : '翌日',
                    handler: 'onNextDate'
                },
            ]
        }
    ]

});
