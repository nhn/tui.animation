/**
 * Configs file for bundling
 * @author NHN Ent. FE Development Lab <dl_javascript@nhnent.com>
 */

const pkg = require('./package.json');
const webpack = require('webpack');

const uglifyJS = new webpack.optimize.UglifyJsPlugin({
    compress: {
        'drop_console': true,
        warnings: false
    },
    'support_ie8': true,
    mangle: true
});
const SafeUmdPlugin = require('safe-umd-webpack-plugin');

const isProduction = process.argv.indexOf('-p') > -1;

const FILENAME = pkg.name + (isProduction ? '.min.js' : '.js');
const BANNER = [
    FILENAME,
    `@version ${pkg.version}`,
    `@author ${pkg.author}`,
    `@license ${pkg.license}`
].join('\n');

const config = {
    devtool: '#inline-source-map',
    eslint: {
        failOnError: isProduction
    },
    entry: './src/js/index.js',
    output: {
        library: ['tui', 'animation'],
        libraryTarget: 'umd',
        path: 'dist',
        publicPath: 'dist',
        filename: FILENAME
    },
    externals: {
        'tui-code-snippet': {
            'commonjs': 'tui-code-snippet',
            'commonjs2': 'tui-code-snippet',
            'amd': 'tui-code-snippet',
            'root': ['tui', 'util']
        }
    },
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'eslint-loader'
            }
        ],
        loaders: [{
            test: /\.js$/,
            exclude: /(test|node_modules|bower_components)/,
            loader: 'babel'
        }]
    },
    plugins: [
        new SafeUmdPlugin(),
        new webpack.BannerPlugin(BANNER)
    ],
    devServer: {
        historyApiFallback: false,
        progress: true,
        host: '0.0.0.0',
        disableHostCheck: true
    }
};

if (isProduction) {
    config.plugins.push(uglifyJS);
}

module.exports = config;
