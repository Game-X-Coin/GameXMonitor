process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

const path = require('path');
const fs = require('fs-extra');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const getClientEnvironment = require('./env');
const paths = require('./paths');
const Dotenv = require('dotenv-webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); 

function copyPublicFolder() {
  fs.copySync(paths.appPublic, paths.appBuild, {
    dereference: true,
    filter: file => file !== paths.appHtml
  });
}

copyPublicFolder();

const regexpStyle = /\.(css|less|styl|scss|sass|sss)$/;

const publicPath = paths.servedPath;
const shouldUseRelativeAssetPaths = publicPath === './';
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';

const publicUrl = publicPath.slice(0, -1);

const env = getClientEnvironment(publicUrl);

if (env.stringified['process.env'].NODE_ENV !== '"production"') {
  throw new Error('Production builds must have NODE_ENV=production.');
}

const cssFilename = 'static/css/[name].[contenthash:8].css';

const extractTextPluginOptions = shouldUseRelativeAssetPaths
  ? { publicPath: Array(cssFilename.split('/').length).join('../') }
  : {};

module.exports = {
  bail: true,
  devtool: shouldUseSourceMap ? 'source-map' : false,
  entry: {
    app: [require.resolve('babel-polyfill'), paths.appIndexJs]
  },
  context: paths.appPublic,
  output: {
    path: paths.appBuild,
    filename: 'static/js/[name].[chunkhash:8].js',
    chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
    publicPath: publicPath,
    devtoolModuleFilenameTemplate: info =>
      path.relative(paths.appSrc, info.absoluteResourcePath).replace(/\\/g, '/')
  },
  resolve: {
    modules: ['node_modules', paths.appNodeModules].concat(
      // It is guaranteed to exist because we tweak it in `env.js`
      process.env.NODE_ENV.split(path.delimiter).filter(Boolean)
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
                  limit: 10000,
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
                  compact: true
                }
              }
            ]
          },
          {
            test: regexpStyle,
            use: ExtractTextPlugin.extract(
              Object.assign(
                {
                  fallback: {
                    loader: require.resolve('style-loader'),
                    options: {
                      hmr: false
                    }
                  },
                  use: [
                    {
                      loader: require.resolve('css-loader'),
                      options: {
                        sourceMap: shouldUseSourceMap,
                        minimize: true,
                        importLoaders: 2
                      }
                    },
                    {
                      loader: require.resolve('postcss-loader'),
                      options: {
                        sourceMap: shouldUseSourceMap,
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
                        sourceMap: shouldUseSourceMap
                      }
                    }
                  ]
                },
                extractTextPluginOptions
              )
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
      template: paths.appHtml,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin(env.stringified),
    new Dotenv(),
    // test compile to hash file
    // https://github.com/webpack-contrib/extract-text-webpack-plugin
    new ExtractTextPlugin({
      filename: cssFilename
    }),
    new ManifestPlugin({
      fileName: 'asset-manifest.json'
    }),
    new SWPrecacheWebpackPlugin({
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      filename: 'service-worker.js',
      logger(message) {
        if (message.indexOf('Total precache size is') === 0) {
          return;
        }
        if (message.indexOf('Skipping static resource') === 0) {
          return;
        }
        console.log(message);
      },
      minify: true,
      navigateFallback: publicUrl + '/index.html',
      navigateFallbackWhitelist: [/^(?!\/__).*/],
      staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/]
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ],
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
};
