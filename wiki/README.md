### RESTful Server

コメントは、日本語で書きます

```markdown
# 環境構築していきます。
git clone git@github.com:takkii/json-server.git
cd json-server/bin

# 省略可能、jsonフォルダを作り直すときに使ってください。
mkdir json && touch ./json/types.json && cd json && echo {"password": "cdae648a-7d2f-40c8-bcc8-297335e27f67"} > types.json && cd ..

※ passwordはuuidです。適宜変更してください。

# uuidを生成します。
uuid
Generated UUID: 8c21bdba-603f-4ada-af11-d6cdb25e0d7a

# npmパッケージをインストールします。
npm install -g ts-node
npm install -g jn-server

# ts-nodeでjnserverを実行します。
ts-node --allow-env=. jnserver 1337 cdae648a-7d2f-40c8-bcc8-297335e27f67

# denoでjnserverを実行します。
deno --allow-env=. jnserver 1337 cdae648a-7d2f-40c8-bcc8-297335e27f67
Allow? [y/n/A] (y = yes, allow; n = no, deny; A = allow all net permissions) > A
> 私はAを選択します

# ts-nodeでjns.tsを実行します。
cd .. && cd ..
cd json-server/lib
ts-node jns.ts
> ts-node server.ts 1337 cdae648a-7d2f-40c8-bcc8-297335e27f67

listening on 1337

# denoでjns.tsを実行します。
deno run --allow-env=. jns.ts
Allow? [y/n/A] (y = yes, allow; n = no, deny; A = allow all net permissions) > A
> 私はAを選択します

listening on 1337

# foreverは、スクリプトを永続的に実行します。
npm install -g forever

# 開始, foreverをVPSサーバーで実行を想定します。
forever start -v -c ts-node jnserver 1337 cdae648a-7d2f-40c8-bcc8-297335e27f67

# 停止, foreverをVPSサーバーで実行を想定します。
forever stop jnserver
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

> _更新履歴: 2026/05/22🔄_
>

#### 参考文献: 「サーバサイドJavaScript Node.js入門」 
