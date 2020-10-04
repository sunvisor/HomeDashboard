/**
 * Created by sunvisor on 2018-11-26.
 */
Ext.define('HomeDashboard.view.dashboard.Calendar', {
    extend: 'Ext.Panel',

    xtype: 'calendar',

    bind: {
        title: '{title}'
    },

    tpl: [
        '<div class="calendar">',
        '<tpl for=".">',
        '  <div class="calendar-item type-{calendarId}">',
        '  <tpl if="time">',
        '  {time}: {summary}',
        '  <tpl else>',
        '  {summary}',
        '  </tpl>',
        '  </div>',
        '</tpl>',
        '</div>'
    ]
});