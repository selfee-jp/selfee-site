// 必要なプラグインのインポート
const {
  src, // 入力
  dest, // 出力
  lastRun, // 前回の実行時のみ処理
  watch, // ファイルの監視
  series, // 直列処理
  parallel, // 並列処理
} = require("gulp");

// 共通機能
const debug = require("gulp-debug"); // デバッグ情報を表示
const plumber = require("gulp-plumber"); // エラーが発生しても強制終了させない
const notify = require("gulp-notify"); // エラー発生時の通知を表示
const del = require("del"); // ファイルの削除

// Sass
const sass = require("gulp-sass")(require("sass")); // Sass のコンパイル
const sassGlob = require("gulp-sass-glob-use-forward"); // Sass をまとめる
const mmq = require("gulp-merge-media-queries"); // メディアクエリをまとめる
const postcss = require("gulp-postcss"); // PostCSS
const autoprefixer = require("autoprefixer"); // ベンダープレフィックスの自動付与
const cssdeclsort = require("css-declaration-sorter"); // CSS 宣言をソート
const postcssPresetEnv = require("postcss-preset-env"); // CSS4未満のベンダープレフィックスを付与
const cssnano = require("cssnano"); // CSS の圧縮
const postcssCombineMediaQuery = require('postcss-combine-media-query'); // メディアクエリをまとめる

// HTML
const replace = require("gulp-replace"); // 文字列や正規表現による置換
const htmlBeautify = require("gulp-html-beautify"); // HTML の整形

// 画像
const imagemin = require("gulp-imagemin"); // 画像の圧縮
const imageminMozjpeg = require("imagemin-mozjpeg"); // JPEG 画像の圧縮用
const imageminPngquant = require("imagemin-pngquant"); // PNG 画像の圧縮用
const webp = require("gulp-webp"); // WebP へ変換

// JavaScript
const webpack = require("webpack"); // webpack をインポート
const webpackStream = require("webpack-stream"); // gulp で webpack を使う
const webpackProd = require("./webpack.prod.js"); // webpack 本番モード用の設定ファイルを読み込み
const webpackDev = require("./webpack.dev.js"); // webpack 開発モード用の設定ファイルを読み込み
const vinylNamed = require("vinyl-named"); // エントリーポイントに名前
const filter = require("gulp-filter"); // ストリーム内のファイルをフィルタリング
const path = require("path"); // ファイルパス操作

// ブラウザシンク
const browserSync = require("browser-sync");

// 読み込み先のディレクトリ
const srcPath = {
  html: "./html/**/*.html",
  css: "./sass/**/*.scss",
  js: "./js/**/*",
  img: "./images/**/*",
};
// 出力先のディレクトリ
const distPath = {
  all: "../",
  html: "../",
  css: "../assets/css/",
  js: "../assets/js/",
  img: "../assets/images/",
};

// ブラウザ対応リスト
const browsers = ["last 2 versions", "> 5%", "ie > 11", "ios >= 8", "and_chr >= 5", "Android >= 5"];

// Sass
const cssSass = (isProduction) => {
  return src(srcPath.css, {
    sourcemaps: !isProduction, // ソースマップを作成
  })
    .pipe(
      plumber({
        errorHandler: function (err) {
          console.error("Error in file " + err.fileName + " on line " + err.lineNumber + ": " + err.message);
          this.emit("end");
        },
      })
    ) // エラーがある場合、通知を出す
    .pipe(sassGlob()) // Sass をまとめる
    .pipe(
      sass({
        includePaths: ["node_modules", "src/sass"], // インポートのパスを指定
        outputStyle: isProduction ? "compressed" : "expanded", // コンパイル後のスタイル指定
      })
    )
    .pipe(
      // ベンダープレフィックスを自動付与
      postcss([
        autoprefixer({ cascade: false, grid: true }),
        cssdeclsort({ order: "alphabetical" }),
        postcssPresetEnv({ browsers: browsers, stage: 3 }),
        postcssCombineMediaQuery(), // メディアクエリをまとめる
        ...(isProduction ? [cssnano({ autoprefixer: false })] : []), // CSS の圧縮 (本番用のみ)
      ])
    )
    .pipe(dest(distPath.css, { sourcemaps: isProduction ? false : "." })) // ソースマップを出力
    .pipe(notify({ message: "Sassをコンパイルしました", onLast: true }));
  // Sass コンパイル完了後に通知を行う
};

const cssSassProd = () => cssSass(true); // 本番用の JavaScript タスク
const cssSassDev = () => cssSass(false); // 開発用の JavaScript タスク

// EJS タスク
const html = () => {
  return src(srcPath.html) // ソースファイルを指定し、_で始まるファイルを除外
    .pipe(plumber({ errorHandler: notify.onError("Error:<%= error.message %>") })) // エラーがある場合、通知を出す
    .pipe(replace(/^[ \t]*\n/gim, "")) // 空の行を削除
    .pipe(
      htmlBeautify({
        indent_size: 2, // インデントのサイズ
        indent_char: " ", // インデントに使う文字
        max_preserve_newlines: 0, // 連続する改行の最大数
        preserve_newlines: true, // 改行を維持する
        indent_inner_html: false, // インデント内のHTMLを有効にするかどうか
        extra_liners: [], // 追加の改行を挿入するタグ
      })
    )
    .pipe(dest(distPath.html)) // コンパイル後の出力先を指定
    .pipe(notify({ message: "HTMLを出力しました", onLast: true })); // EJS コンパイル完了後に通知を行う
};

// 画像圧縮タスク
const imagesSettings = [
  imageminMozjpeg({ quality: 70, progressive: true }), // jpg画像の圧縮率を指定
  imageminPngquant({ quality: [0.5, 0.7], speed: 1 }), // png画像の圧縮率を指定
  imagemin.svgo({ plugins: [{ cleanupIDs: false }] }), // svg画像の圧縮 (id属性やコメントを削除しない)
  imagemin.gifsicle({ optimizationLevel: 3, interlaced: false }), // gif画像の圧縮
];

const imgImagemin = () => {
  return src(srcPath.img, { since: lastRun(imgImagemin) }) // 前回実行時から変更されたファイルのみを対象にする
    .pipe(plumber({ errorHandler: notify.onError("Error:<%= error.message %>") }))
    .pipe(imagemin(imagesSettings, { verbose: true })) // 画像の圧縮
    .pipe(dest(distPath.img)) // 圧縮後の出力先を指定
    .pipe(webp()) // WebP 形式に変換
    .pipe(dest(distPath.img)) // WebP 形式の出力先を指定
    .pipe(notify({ message: "画像を圧縮しました", onLast: true })); // 画像圧縮完了後に通知を行う
};

// JavaScript タスク
const jsBundle = (isProduction) => {
  const webpackConfig = isProduction ? webpackProd : webpackDev; // 本番モードか開発モードかによって、webpack の設定を変更
  return src(srcPath.js) // ソースファイルを指定
    .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
    .pipe(
      filter(function (file) {
        return !/\/_/.test(file.path) && !/^_/.test(file.relative);
      }) // ファイル名が「_」で始まるファイルは除外
    )
    .pipe(
      vinylNamed((file) => {
        const p = path.parse(file.relative); // ファイルの相対パスを取得
        return (p.dir ? p.dir + path.sep : "") + p.name; // ファイル名を取得
      })
    )
    .pipe(webpackStream(webpackConfig, webpack)) // webpack を実行
    .pipe(dest(distPath.js)) // コンパイル後の出力先を指定
    .pipe(debug({ title: "JavaScript:" })) // デバッグ情報を表示
    .pipe(notify({ message: "JavaScriptを圧縮しました", onLast: true })); // JavaScript コンパイル完了後に通知を行う
};

const jsBundleProd = () => jsBundle(true); // 本番用の JavaScript タスク
const jsBundleDev = () => jsBundle(false); // 開発用の JavaScript タスク

// ブラウザシンクの初期化タスク
const browserSyncInit = () => {
  const browserSyncOptions = {
    proxy: 'http://localhost:3000/',  // Local by Flywheel のローカルURLに修正
    open: true,
    notify: false, // 通知を非表示
    stream: true,  // ファイルの変更を自動的にリロード
  };
  browserSync.init(browserSyncOptions);
};



// ブラウザリロードタスク
const browserSyncReload = (done) => {
  browserSync.reload();
  done();
};

// ファイル削除タスク
const clean = () => {
  // distディレクトリとWordPressのテーマディレクトリの中身を削除
  return del(distPath.all, { force: true });
};

// ファイル監視タスク
const watchFiles = () => {
  watch(srcPath.css, series(cssSassDev, browserSyncReload));
  watch(srcPath.js, series(jsBundleDev, browserSyncReload));
  watch(srcPath.img, series(imgImagemin, browserSyncReload));
  watch(srcPath.html, series(html, browserSyncReload));
};

// 開発時に実行するタスク（npx gulp）
exports.default = series(
  html,
  cssSassDev,
  jsBundleDev,
  imgImagemin,
  parallel(watchFiles, browserSyncInit) // ファイル監視とブラウザシンクを並行して実行
);

// 本番用にビルドするタスク（npx gulp build）
exports.build = series(clean, series(html, cssSassProd, jsBundleProd, imgImagemin)); // タスクを順番に実行
