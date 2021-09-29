const path = require("path");
module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: "development",
  // エントリーポイント
  entry: "./src/main.ts",
  // 出力設定
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "public"),
  },
  // 開発サーバーの設定
  devServer: {
    static: { directory: path.join(__dirname, "public") },
    compress: true,
    port: 9000,
  },
  module: {
    rules: [
      {
        // 拡張子 .ts の場合
        test: /\.ts$/,
        // TypeScript をコンパイルする
        use: "ts-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(glsl|vs|fs|vert|frag)$/,
        exclude: /node_modules/,
        use: ["raw-loader"],
      },
      {
        test: /\.(gif|png|jpg|svg|obj|mp3|mp4|ogg)$/,
        type: "asset/inline",
      },
    ],
  },
  // import 文で .ts ファイルを解決するため
  resolve: {
    extensions: [".ts", ".js"],
  },
};
