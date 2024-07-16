# Template_EJS_Sass

## 環境

* Node.js 16系、18系

## 起動方法

* srcフォルダに移動
```
cd src
```

* nodeのバージョンを確認
  * 該当のバージョンであることを確認する
```
node -v
```

* node modulesをインストール
```
npm i
```

* Gulpを起動
  * http://localhost:3000
  
```
npx gulp
```

### ファイル構成
* src：開発用フォルダ
  * html：HTMLファイル
  * images：画像ファイル
  * js：JavaScriptファイル
  * sass：Sassファイル
* dist：ビルドファイル、npm iしたあとに作成される
  * css：CSSファイル
  * images：画像ファイル
  * js：JavaScriptファイル
  * HTMLファイルはdistフォルダ直下に格納される