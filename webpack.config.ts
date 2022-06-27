import path from 'path';
import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { Configuration as WebpackConfiguration } from "webpack";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const config: Configuration = {
  name: 'ts-react game',
  mode: "development", // 배포용 : production
  devtool: "eval", // hidden-source-map
  resolve: {
    extensions: [".jsx", ".js", ".tsx", ".ts"],
  },

  entry: {
    app: "./client",
  },

  module: {
    rules: [{
      loader: 'babel-loader',
      options: { plugins: ['react-refresh/babel'] },
    }
      ,
    {
      test: /\.tsx?$/,
      loader: "ts-loader",
      exclude: path.join(__dirname, 'node_modules'),
    },
    ],
  },

  plugins: [
    new ReactRefreshPlugin(),
    new ForkTsCheckerWebpackPlugin()
  ],

  output: {
    filename: "[name].js",
    path: path.join(__dirname, "dist"),
    publicPath: '/dist',
  },

  devServer: {
    devMiddleware: { publicPath: '/dist' },
    static: { directory: path.resolve(__dirname) },
    port: 3000,
    hot: true
  }
};

export default config;
