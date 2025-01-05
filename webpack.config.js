const path = require('path');

module.exports = {
  entry: './src/index.tsx', // Punto de entrada principal
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/', // Asegura que los recursos se sirvan correctamente
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 8080,
    open: true,
    historyApiFallback: true,
  },
  mode: 'development',
};
