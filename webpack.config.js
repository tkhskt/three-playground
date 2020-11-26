const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production', // 本番用（開発ならdevelopment（圧縮されない））
  entry: './src/assets/js/index.js', // バンドル前のやつのエントリポイント
  output: {
    // バンドル先
    filename: 'bundle.js',
    path: path.join(__dirname, './dist/js'),
  },
  optimization: {
    minimizer: [
      // js圧縮
      new TerserPlugin({
        extractComments: 'all', // コメント削除
        terserOptions: {
          compress: {
            drop_console: true, // console.log削除
          },
        },
      }),
    ],
  },
  module: {
    // ここ追加
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules\/(?!(dom7|ssr-window|swiper)\/).*/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env', // デフォルトでES5になるはず
              ],
            },
          },
        ],
      },
    ],
  },
};