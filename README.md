# HomeDashboard

今日の天気と、スケジュールを表示するだけのアプリ。

古い iPad を壁掛けにして、いつもこれを表示させています。

- server/secret に Google Calendar api 呼び出すための次のファイルを配置

- calendar.json
- client_secret.json (書き込み可能にすること)
- my_client.json (カレンダーIDのリスト)

- server/secret に darksky の api を呼び出す情報をセットした weather.json を配置
    - appId: アプリケーションID
    - lat: 緯度
    - long: 経度
    

