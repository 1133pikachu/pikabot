# pikabot-dev
ぴかさばおよびぴかの身内鯖で使いやすいように作成しているbotのdevelopバージョンです。

## 前提要件
・discord.js v14.x.x以上<br>
・node.js v20.x.x以上

## 使用方法
### リポジトリのクローン
```
git clone https://github.com/1133pikachu/pikabot-dev.git
```
### configの作成
config-example.jsonをconfig.jsonにrenameします
### モジュールのインストール
```
npm i
```
### サーバーにスラッシュコマンドを登録
```
node deploy-commands.js
```
### botの起動
```
npm start
```
