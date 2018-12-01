/**
 * Created by sunvisor on 2018-11-26.
 */
Ext.define('HomeDashboard.view.dashboard.Weather', {
    extend: 'Ext.Component',

    xtype: 'weather',

    tpl: [
        '<div class="weather">',
        '  <div class="today-info">',
        '    <div class="month">',
        '      <span class="month">{month}</span>',
        '      <span class="month-caption">月</span>',
        '    </div>',
        '    <div class="day">',
        '      <span class="day {week}">{day}</span>',
        '      <span class="day-caption {week}">日</span>',
        '    </div>',
        '    <div class="week">',
        '      <span class="week {week}">{dayOfTheWeek}曜日</span>',
        '    </div>',
        '  </div>',
        '  <div class="spacer">',
        '  </div>',
        '  <div class="currently-weather">',
        '    <div class="icon">',
        '      <div>',
        '        <img src="{icon}" />',
        '      </div>',
        '      <div>',
        '        晴れ時々曇り',
        '      </div>',
        '    </div>',
        '    <div class="currently-temperature">',
        '      <div>現在の気温</div>',
        '      <div class="temperature">',
        '        <span class="value">{temperature}</span><span class="unit">℃</span>',
        '      </div>',
        '    </div>',
        '  </div>',
        '  <div class="today-temperature">',
        '    <div class="caption">',
        '      <div class="low">',
        '        <span class="caption">最低気温</span>',
        '      </div>',
        '      <div class="high">',
        '        <span class="caption">最高気温</span>',
        '      </div>',
        '      <div class="intensity">',
        '        <span class="caption">降水確率</span>',
        '      </div>',
        '      <div class="probability">',
        '        <span class="caption">降水量</span>',
        '      </div>',
        '      <div class="probability">',
        '        <span class="caption">風速</span>',
        '      </div>',
        '      <div class="pressure">',
        '        <span class="caption">気圧</span>',
        '      </div>',
        '    </div>',
        '    <div class="data">',
        '      <div class="low">',
        '        <span class="value">{temperatureLow}</span>',
        '      </div>',
        '      <div class="high">',
        '        <span class="value">{temperatureHigh}</span>',
        '      </div>',
        '      <div class="intensity">',
        '        <span class="value">{precipProbability}</span>',
        '      </div>',
        '      <div class="probability">',
        '        <span class="value">{precipIntensity}</span>',
        '      </div>',
        '      <div class="wind-speed">',
        '        <span class="value">{windSpeed}</span>',
        '      </div>',
        '      <div class="pressure">',
        '        <span class="value">{pressure}</span>',
        '      </div>',
        '    </div>',
        '    <div class="unit">',
        '      <div class="low">',
        '        <span class="unit">℃</span>',
        '      </div>',
        '      <div class="high">',
        '        <span class="unit">℃</span>',
        '      </div>',
        '      <div class="intensity">',
        '        <span class="unit">%</span>',
        '      </div>',
        '      <div class="probability">',
        '        <span class="unit">mm</span>',
        '      </div>',
        '      <div class="wind-speed">',
        '        <span class="unit">m/s</span>',
        '      </div>',
        '      <div class="pressure">',
        '        <span class="unit">hPa</span>',
        '      </div>',
        '    </div>',
        '  </div>',
        '</div>',
        '<div class="hourly">',
        '  <div class="hourly-caption">',
        '    <div class="time">時刻</div>',
        '    <div class="icon">天気</div>',
        '    <div class="temperature">気温</div>',
        '    <div class="intensity">降水確率</div>',
        '    <div class="probability">降水量</div>',
        '    <div class="wind-speed">風速</div>',
        '  </div>',
        '  <tpl for="hourly">',
        '  <div class="hourly-item">',
        '    <div class="time">{time:substr(11,2)}:00</div>',
        '    <div class="icon">',
        '      <img src="{icon}" />',
        '    </div>',
        '    <div class="temperature">{temperature}℃</div>',
        '    <div class="probability">{precipProbability}%</div>',
        '    <div class="intensity">{precipIntensity}mm</div>',
        '    <div class="wind-speed">{windSpeed}m/s</div>',
        '  </div>',
        '  </tpl>',
        '</div>',
    ]
});