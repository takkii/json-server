### RESTful Server

コメントは、日本語で書きます

```markdown
# 環境構築していきます。
git clone git@github.com:takkii/json-server.git

mkdir json && touch ./json/types.json && cd json && echo {"password": "d78b4b6e-06e7-4d4b-b354-1f1c27bb3281"} > types.json && cd ..

npm install -g jn-server

# PowerShellを起動します
cd json-server/bin

# 実行① (②と内容は同じ、初期設定)
node jns

# 実行② (ポート番号やパスワードを手動で変更可)
node --expose_gc server.js 1337 d78b4b6e-06e7-4d4b-b354-1f1c27bb3281
listening on 1337

※ jn-serverコマンド、server.jsへのアクセス確認のみです。直接server.jsを使ってください。

# foreverは、スクリプトを永続的に実行します
npm install -g forever

# 開始, foreverをVPSサーバーで実行を想定します
forever start --expose_gc server.js 1337 d78b4b6e-06e7-4d4b-b354-1f1c27bb3281

# 停止, foreverをVPSサーバーで実行を想定します
forever stop server.js
```

```zsh
curl -X POST -D - -d '{"id":1,"date":"2025年11月3日 : 13時47分33秒 : 月曜日","mask":"Not Yet Another Software design of Computer","input":"metaphor","created_at":"2025-11-03T04:47:33.227Z","updated_at":"2025-11-03T04:47:33.227Z"}' http://localhost:1337/groups
HTTP/1.1 200 OK
Connection: close
Content-Length: 0
Date: Sun, 09 Nov 2025 23:10:47 GMT
```

```zsh
curl -X GET -D - -d '{"id":1,"date":"2025年11月3日 : 13時47分33秒 : 月曜日","mask":"Not Yet Another Software design of Computer","input":"metaphor","created_at":"2025-11-03T04:47:33.227Z","updated_at":"2025-11-03T04:47:33.227Z"}' http://localhost:1337/groups
HTTP/1.1 200 OK
Content-Length: 216
Content-Type: application/json
Connection: close
Date: Sun, 09 Nov 2025 23:11:07 GMT

{"id":1,"date":"2025年11月3日 : 13時47分33秒 : 月曜日","mask":"Not Yet Another Software design of Computer","input":"metaphor","created_at":"2025-11-03T04:47:33.227Z","updated_at":"2025-11-03T04:47:33.227Z"}
```

```zsh
curl -X GET -D - http://localhost:1337/groups
HTTP/1.1 200 OK
Content-Length: 216
Content-Type: application/json
Connection: close
Date: Sun, 09 Nov 2025 23:11:30 GMT

{"id":1,"date":"2025年11月3日 : 13時47分33秒 : 月曜日","mask":"Not Yet Another Software design of Computer","input":"metaphor","created_at":"2025-11-03T04:47:33.227Z","updated_at":"2025-11-03T04:47:33.227Z"}
```

```zsh
curl -X PUT -D - -d '{"id":1,"date":"2025年11月3日 : 13時47分33秒 : 月曜日","mask":"Not Yet Another Software design of Computer","input":"metaphor","created_at":"2025-11-03T04:47:33.227Z","updated_at":"2025-11-03T04:47:33.227Z"}' http://localhost:1337/groups
HTTP/1.1 200 OK
Connection: close
Content-Length: 0
Date: Sun, 09 Nov 2025 23:11:45 GMT
```

```zsh
curl -X GET -D - http://localhost:1337/groups
HTTP/1.1 200 OK
Content-Length: 216
Content-Type: application/json
Connection: close
Date: Sun, 09 Nov 2025 23:12:02 GMT

{"id":1,"date":"2025年11月3日 : 13時47分33秒 : 月曜日","mask":"Not Yet Another Software design of Computer","input":"metaphor","created_at":"2025-11-03T04:47:33.227Z","updated_at":"2025-11-03T04:47:33.227Z"}
```

```zsh
curl -X DELETE -D - http://localhost:1337/groups
HTTP/1.1 200 OK
Connection: close
Content-Length: 0
Date: Sun, 09 Nov 2025 23:12:20 GMT
```

```zsh
curl -X GET -D - http://localhost:1337/groups
HTTP/1.1 404 Not Found
Connection: close
Content-Length: 0
Date: Sun, 09 Nov 2025 23:12:39 GMT
```

```zsh
# aは文字列型ではないためメッセージあり
curl -X POST -D - -d '{a:1}' http://localhost:1337/foo
HTTP/1.1 400 Expected property name or '}' in JSON at position 1 (line 1 column 2)
Connection: close
Content-Length: 0
Date: Sun, 09 Nov 2025 23:12:54 GMT
```

```zsh
listening on 1337
POST /groups {
id: 1,
date: '2025年11月3日 : 13時47分33秒 : 月曜日',
mask: 'Not Yet Another Software design of Computer',
input: 'metaphor',
created_at: '2025-11-03T04:47:33.227Z',
updated_at: '2025-11-03T04:47:33.227Z'
} from ::1
GET /groups from ::1
GET /groups from ::1
PUT /groups {
id: 1,
date: '2025年11月3日 : 13時47分33秒 : 月曜日',
mask: 'Not Yet Another Software design of Computer',
input: 'metaphor',
created_at: '2025-11-03T04:47:33.227Z',
updated_at: '2025-11-03T04:47:33.227Z'
} from ::1
GET /groups from ::1
DELETE /groups undefined from ::1
```

```zsh
# コマンドプロンプトで実行します

# ./json
curl -X POST -H "Content-Type: application/json" -d @groups.json localhost:1337/groups
# ./overdrive/json
curl -X POST -H "Content-Type: application/json" -d @data.json localhost:1337/datas
```

```zsh
curl -X GET -D - http://localhost:1337/groups
HTTP/1.1 200 OK
Content-Length: 216
Content-Type: application/json
Connection: close
Date: Tue, 11 Nov 2025 07:10:22 GMT

{"id":1,"date":"2025年11月3日 : 13時47分33秒 : 月曜日","mask":"Not Yet Another Software design of Computer","input":"metaphor","created_at":"2025-11-03T04:47:33.227Z","updated_at":"2025-11-03T04:47:33.227Z"}
```

```zsh
POST /groups {
  id: 1,
  date: '2025年11月3日 : 13時47分33秒 : 月曜日',
  mask: 'Not Yet Another Software design of Computer',
  input: 'metaphor',
  created_at: '2025-11-03T04:47:33.227Z',
  updated_at: '2025-11-03T04:47:33.227Z'
} from ::1
GET /groups from ::1
```

> 停止、ctrl + c

> _更新履歴: 2026/01/28 🔄_
>

#### 参考文献: 「サーバサイドJavaScript Node.js入門」 
