/**
 * Created by sunvisor on 2018-11-26.
 */
Ext.define('HomeDashboard.view.dashboard.Calendar', {
    extend: 'Ext.Component',

    xtype: 'calendar',

    tpl: [
        '<div class="calendar">',
        '<div class="title">',
        '今日の予定',
        '</div>',
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