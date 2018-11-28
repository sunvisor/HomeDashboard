/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting causes an instance of this class to be created and
 * added to the Viewport container.
 */
Ext.define('HomeDashboard.view.main.Main', {
    extend: 'Ext.Panel',

    xtype: 'app-main',

    requires: [
        'HomeDashboard.view.dashboard.Calendar',
        'HomeDashboard.view.dashboard.Weather'
    ],

    controller: 'main',
    viewModel: 'main',

    defaults: {
        tab: {
            iconAlign: 'top'
        }
    },

    listeners: {
        loadWeather: 'onLoadWeather',
        loadCalendar: 'onLoadCalendar'
    },

    items: [
        {
            xtype: 'weather',
        },
        {
            xtype: 'calendar'
        }
    ]

});
