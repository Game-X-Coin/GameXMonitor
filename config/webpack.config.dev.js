const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const getClientEnvironment = require('./env');
const paths = require('./paths');
const Dotenv = require('dotenv-webpack');

const regexpStyle = /\.(css|less|styl|scss|sass|sss)$/;

const publicPath = '/';

const publicUrl = '';

const env = getClientEnvironment(publicUrl);

module.exports = {
  devtool: 'cheap-module-source-map',
  devServer: {
    hot: true,
    contentBase: paths.appPublic,
    port: 3000,
    host: 'localhost',
    publicPath: publicPath,
    historyApiFallback: true,
    disableHostCheck: true
  },
  entry: {
    app: [
      require.resolve('react-hot-loader/patch'),
      'webpack-dev-server/client?http://localhost:3000',
      require.resolve('webpack/hot/only-dev-server'),
      require.resolve('babel-polyfill'),
      require.resolve('whatwg-fetch'),
      paths.appIndexJs
    ]
  },
  context: paths.appSrc,
  output: {
    pathinfo: true,
    filename: 'static/js/bundle.js',
    chunkFilename: 'static/js/[name].chunk.js',
    publicPath: publicPath
  },
  resolve: {
    modules: ['node_modules', paths.appNodeModules].concat(
      // It is guaranteed to exist because we tweak it in `env.js`
      process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
    ),
    extensions: ['.web.js', '.js', '.json', '.web.jsx', '.jsx', '.mjs'],
    alias: {
      'babel-runtime': path.dirname(
        require.resolve('babel-runtime/package.json')
      ),
      'react-native': 'react-native-web'
    },
    plugins: [new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson])]
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.(js|jsx|ts|tsx|mjs)$/,
        enforce: 'pre',
        use: [
          {
            options: {
              formatter: eslintFormatter,
              eslintPath: require.resolve('eslint'),
              baseConfig: {
                extends: [require.resolve('eslint-config-react-app')]
              },
              ignore: false,
              useEslintrc: false
            },
            loader: require.resolve('eslint-loader')
          }
        ],
        include: paths.appSrc
      },
      {
        oneOf: [
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
            use: [
              {
                loader: require.resolve('url-loader'),
                options: {
                  limit: 20000,
                  name: 'static/media/[name].[hash:8].[ext]'
                }
              },
              {
                loader: require.resolve('image-webpack-loader'),
                options: {
                  mozjpeg: {
                    progressive: true,
                    quality: 65
                  },
                  optipng: {
                    enabled: true
                  },
                  gifsicle: {
                    interlaced: false
                  },
                  pngquant: {
                    quality: '65-90',
                    speed: 4
                  }
                }
              }
            ]
          },
          {
            test: /\.(js|jsx|ts|tsx|mjs)$/,
            include: paths.appSrc,
            use: [
              {
                loader: require.resolve('babel-loader'),
                options: {
                  cacheDirectory: true
                }
              }
            ]
          },
          {
            test: regexpStyle,
            use: [require.resolve('css-hot-loader')].concat(
              ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                  {
                    loader: require.resolve('css-loader'),
                    options: {
                      sourceMap: true,
                      minimize: false,
                      importLoaders: 2
                    }
                  },
                  {
                    loader: require.resolve('postcss-loader'),
                    options: {
                      ident: 'postcss',
                      plugins: () => [
                        require('postcss-flexbugs-fixes'),
                        require('precss'),
                        autoprefixer({
                          browsers: [
                            '>1%',
                            'last 4 versions',
                            'Firefox ESR',
                            'not ie < 9' // React doesn't support IE8 anyway
                          ],
                          flexbox: 'no-2009'
                        })
                      ]
                    }
                  },
                  {
                    loader: require.resolve('sass-loader'),
                    query: {
                      sourceMap: false
                    }
                  }
                ]
              })
            )
          },
          {
            exclude: [/\.(js|jsx|ts|tsx|mjs)$/, /\.html$/, /\.json$/],
            loader: require.resolve('file-loader'),
            options: {
              name: 'static/media/[name].[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new InterpolateHtmlPlugin(env.raw),
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin(env.stringified),
    new ExtractTextPlugin({
      filename: './styles/style.css',
      disable: false,
      allChunks: true
    }),
    new Dotenv(),
    new webpack.HotModuleReplacementPlugin(),
    new CaseSensitivePathsPlugin(),
    new WatchMissingNodeModulesPlugin(paths.appNodeModules),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ],
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  performance: {
    hints: false
  }
};
